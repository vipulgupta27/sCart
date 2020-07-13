export const UPDATE_FILTER_LIST = 'UPDATE_FILTER_LIST';
export const SET_MIN_PRICE_VAL = 'SET_MIN_PRICE_VAL';
export const SET_MAX_PRICE_VAL = 'SET_MAX_PRICE_VAL';

export const setMinPrice = (data) => ({
    type: SET_MIN_PRICE_VAL,
    data:data,
});

export const setMaxPrice = (data) => ({
    type: SET_MAX_PRICE_VAL,
    data: data,
});
