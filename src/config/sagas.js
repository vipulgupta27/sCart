import { takeEvery, call, put } from 'redux-saga/effects';
import find from 'lodash/find';

import { CHECK_USER, USER_NOT_EXIST, SET_USER_EXIST } from '../actions/login';
import { UPDATE_FILTER_LIST } from '../actions/filter';
import { UPDATE_PRODUCT_LIST, PRODUCT_SEARCH } from '../actions/product';

const apiRequest = function* (url, params = {}) {
    const result = yield fetch(url, {
        ...params,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            ...(params.headers || {}),
        },
    });
    if (result.status === 401) {
        return yield apiRequest(url, params);
    }
    if (result.status === 400) {
        console.log(result);
    } else {
        return result;
    }
};
const checkUserExist = data => apiRequest(`https://xebiascart.herokuapp.com/users?username=` + data.userName);
const getFilterList = data => apiRequest(`https://xebiascart.herokuapp.com/filters`);
const getProductList = data => apiRequest(`https://xebiascart.herokuapp.com/products`);
const searchProductList = data => apiRequest(`https://xebiascart.herokuapp.com/products?title=`+data);

export function* checkUserFunc(action) {
    try {
        const response = yield call(checkUserExist, action.data);
        const result = yield response.json();
        if (result.length === 0) {
            yield put({ type: USER_NOT_EXIST, error: 'User Not found.'});
        } else {
            const data = find(result, function (val) {
                return val.username === (action.data.userName).toLowerCase() && val.password === action.data.password;
            });
            if(data === undefined){
                yield put({ type: USER_NOT_EXIST, error: 'User Not found.'});
            }else{
                const filter = yield call(getFilterList);
                const product = yield call(getProductList);
                const productList = yield product.json()
                const filterList = yield filter.json();
                yield put({ type: UPDATE_FILTER_LIST, data: filterList});
                yield put({ type: UPDATE_PRODUCT_LIST, data: productList});
                yield put({ type: SET_USER_EXIST, data});
            }
        }
    } catch(e) {
        console.log(e);
    }
}

export function* searchProduct(action){
    try{
        let response;
        if (action.data === ''){
            response = yield call(searchProductList, action.data);
        }else{
            response = yield call(getProductList);
        }
        const productList = yield response.json();
        yield put({ type: UPDATE_PRODUCT_LIST, data: productList});
    }catch(e) {
        console.log(e);
    }
}
export default function* sagas() {
    yield takeEvery(CHECK_USER, checkUserFunc);
    yield takeEvery(PRODUCT_SEARCH, searchProduct);
}