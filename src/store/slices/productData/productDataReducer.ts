import { SET_PRODUCT_DATA, SET_PRODUCT_LOADING, SET_PRODUCT_ERROR } from './productDataActionTypes';

interface ProductDataState {
    data: unknown[];
    loading: boolean;
    error: string | null;
}

const initialState: ProductDataState = {
    data: [],
    loading: false,
    error: null
};

type ProductDataAction =
    | { type: typeof SET_PRODUCT_DATA; payload: unknown[] }
    | { type: typeof SET_PRODUCT_LOADING; payload: boolean }
    | { type: typeof SET_PRODUCT_ERROR; payload: string };

const productDataReducer = (state: ProductDataState = initialState, action: ProductDataAction): ProductDataState => {
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