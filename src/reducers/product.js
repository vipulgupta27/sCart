import { UPDATE_PRODUCT_LIST, ADD_TO_CART, FILTER_APPLY } from '../actions/product';

const initialState = {
    cartAdded: 0,
    cartProduct: [],
    allProductList: [],
    filterProduct: [],
}
export default (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_PRODUCT_LIST: 
            return {
                ...state,
                allProductList: action.data,
                filterProduct: action.data,
            }
        case FILTER_APPLY: 
            return {
                    ...state,
                    filterProduct: (state.allProductList).filter((val) => {
                        let flag;
                        if (action.data.maxPrice !== 5000) {
                            flag = val.price.final_price >= action.data.MN && val.price.final_price <= action.data.MX;
                        } else {
                            flag = val.price.final_price >= action.data.minPrice;
                        }
                        if ((action.data.C).length) {
                            flag = flag && (action.data.C).includes(val.colour.color);
                        }
                        if ((action.data.B).length) {
                            console.log(val.brand, val);
                            flag = flag && (action.data.B).map(v => v.toLowerCase()).includes((val.brand).toLowerCase());
                        }
                        return flag;
                    })
                }
            
        case ADD_TO_CART: 
            return {
                ...state,
                cartAdded: (state.cartAdded+1)
            }
        case "persist/REHYDRATE":
            if (action.payload){
                return {
                    ...action.payload.product,
                    filterProduct: action.payload.product.allProductList,
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