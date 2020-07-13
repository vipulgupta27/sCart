import { UPDATE_FILTER_LIST } from '../actions/filter';

const initialState = {
    filterList: [],
}
export default (state = initialState, action) => {
    console.log(action);
    switch (action.type) {
        case UPDATE_FILTER_LIST: 
            return {
                ...state,
                filterList: action.data,
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