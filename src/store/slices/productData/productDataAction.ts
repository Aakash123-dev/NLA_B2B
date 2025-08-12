import { eventService } from '@/services/eventServices/eventServices';
import { SET_PRODUCT_DATA, SET_PRODUCT_LOADING, SET_PRODUCT_ERROR } from './productDataActionTypes';

export const setProductData = (data) => ({
    type: SET_PRODUCT_DATA,
    payload: data
});

export const setProductLoading = (loading) => ({
    type: SET_PRODUCT_LOADING,
    payload: loading
});

export const setProductError = (error) => ({
    type: SET_PRODUCT_ERROR,
    payload: error
});

export const fetchProductData = (products, projectId, modelId, retailerId) => async (dispatch) => {
    try {
        dispatch(setProductLoading(true));
        const productData = await eventService.fetchProductData(products, projectId, modelId, retailerId);
        dispatch(setProductData(productData));
    } catch (error) {
        dispatch(setProductError(error.message));
        console.log("Error in fetching promo event simulation data: ", error);
    } finally {
        dispatch(setProductLoading(false));
    }
};

const productDataAction = {
    setProductData,
    setProductLoading,
    setProductError,
    fetchProductData
};

export default productDataAction; 