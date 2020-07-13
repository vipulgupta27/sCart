import { UPDATE_FILTER_LIST, SET_MIN_PRICE_VAL, SET_MAX_PRICE_VAL } from '../actions/filter';

const initialState = {
    filterList: [],
    minPrice: 0,
    maxPrice: 5000,
    selectColor: [],
    selectBrand: []
}
export default (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_FILTER_LIST: 
            return {
                ...state,
                filterList: action.data,
            }
        case SET_MIN_PRICE_VAL: 
            return {
                ...state,
                minPrice: action.data,
            }
        case SET_MAX_PRICE_VAL:
            return {
                ...state,
                maxPrice: action.data,
            }
        case "persist/REHYDRATE": 
            return {
                ...state,
                filterList: ((action.payload) ? action.payload.filter.filterList : []),
            }
        default:
            return {
                ...state,
            };
    }
}