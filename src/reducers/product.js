import { UPDATE_PRODUCT_LIST, ADD_TO_CART, PRODUCT_SEARCH } from '../actions/product';

const initialState = {
    cartAdded: 0,
    cartProduct: [],
    productList: [],
}
export default (state = initialState, action) => {
    // console.log(action);
    switch (action.type) {
        case UPDATE_PRODUCT_LIST: 
            return {
                ...state,
                productList: action.data,
            }
        case ADD_TO_CART: 
            return {
                ...state,
                cartAdded: (state.cartAdded+1)
            }
        case "persist/REHYDRATE":
            if (action.payload){
                return {
                    ...action.payload.product
                }
            }else{
                return {
                    ...state
                }
            }
        default:
            return {
                ...state,
            };
    }
}