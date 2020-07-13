import { UPDATE_PRODUCT_LIST, ADD_TO_CART, FILTER_APPLY } from '../actions/product';

const initialState = {
    cartAdded: 0,
    cartProduct: [],
    allProductList: [],
    filterProduct: [],
}
export default (state = initialState, action) => {
    // console.log(action);
    switch (action.type) {
        case UPDATE_PRODUCT_LIST: 
            return {
                ...state,
                allProductList: action.data,
                filterProduct: action.data,
            }
        case FILTER_APPLY: 
            if (action.filterType === 'P'){
                console.log(state.allProductList);
                return {
                    ...state,
                    filterProduct: (state.allProductList).filter((val) => {
                        if (action.data.maxPrice !== 5000){
                            return val.price.final_price >= action.data.minPrice && val.price.final_price <= action.data.maxPrice;
                        }else{
                            return val.price.final_price >= action.data.minPrice;
                        }
                    })
                }
            }else{
                return {
                    ...state
                }
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