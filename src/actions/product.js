export const UPDATE_PRODUCT_LIST = 'UPDATE_PRODUCT_LIST';
export const ADD_TO_CART = 'ADD_TO_CART';
export const PRODUCT_SEARCH = 'PRODUCT_SEARCH';

export const addToCart = () => ({
    type: ADD_TO_CART,
});

export const searchProduct = (data) => ({
    type: PRODUCT_SEARCH,
    data:data,
})