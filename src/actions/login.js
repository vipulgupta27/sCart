export const IS_USER_LOGIN = 'IS_USER_LOGIN';
export const CHECK_USER = 'CHECK_USER';
export const USER_NOT_EXIST = 'USER_NOT_EXIST';
export const RESET_ERROR_MESSAGE = 'RESET_ERROR_MESSAGE';
export const SET_USER_EXIST = 'SET_USER_EXIST';

export const isUserLogin = () => ({
    type: IS_USER_LOGIN,
});

export const checkUser = (data) => ({
    data: data,
    type: CHECK_USER,
});

export const resetErrorMessage = ()=>({
    type: RESET_ERROR_MESSAGE,
});