import { SET_PRODUCT_DATA, SET_PRODUCT_LOADING, SET_PRODUCT_ERROR } from './productDataActionTypes';

const initialState = {
    data: [],
    loading: false,
    error: null
};

const productDataReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PRODUCT_DATA:
            return {
                ...state,
                data: action.payload,
                loading: false,
                error: null
            };
        case SET_PRODUCT_LOADING:
            return {
                ...state,
                loading: action.payload
            };
        case SET_PRODUCT_ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false
            };
        default:
            return state;
    }
};

export default productDataReducer; 