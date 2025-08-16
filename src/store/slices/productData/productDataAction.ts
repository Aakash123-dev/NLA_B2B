import { eventService } from '@/services/eventServices/eventServices';
import { SET_PRODUCT_DATA, SET_PRODUCT_LOADING, SET_PRODUCT_ERROR } from './productDataActionTypes';
import type { AppDispatch } from '@/store';

export const setProductData = (data: unknown) => ({
    type: SET_PRODUCT_DATA,
    payload: data
});

export const setProductLoading = (loading: boolean) => ({
    type: SET_PRODUCT_LOADING,
    payload: loading
});

export const setProductError = (error: string) => ({
    type: SET_PRODUCT_ERROR,
    payload: error
});

export const fetchProductData = (
    products: string[],
    projectId: string,
    modelId: string,
    retailerId: string
) => async (dispatch: AppDispatch) => {
    try {
        dispatch(setProductLoading(true));
        const productData = await eventService.fetchProductData(products, projectId, modelId, retailerId);
        dispatch(setProductData(productData));
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        dispatch(setProductError(message));
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