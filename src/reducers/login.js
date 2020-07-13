import { USER_NOT_EXIST, RESET_ERROR_MESSAGE, SET_USER_EXIST, CHECK_USER } from '../actions/login';

const initialState = {
    isLogin : false,
    isLoading: false,
    userName: '',
    errorMessage: '',
    isError: false,
}
export default (state = initialState, action) => {
    switch(action.type){
        case USER_NOT_EXIST: 
            return {
                ...state,
                isError: true,
                isLoading: false,
                errorMessage: action.error
            }
        case CHECK_USER: 
            return {
                ...state,
                isLoading: true,
            }
        case RESET_ERROR_MESSAGE: 
            return {
                ...state,
                isError: false,
                isLoading: false,
                errorMessage: ''
            }
        case SET_USER_EXIST: 
            return {
                ...state,
                isLogin: true,
                isLoading: false,
                userName: action.data.username,
            }
        case "persist/REHYDRATE":
            if (action.payload){
                return {
                    ...action.payload.login
                }
            }else{
                return {
                    ...state
                }
            }
        default:
            return {
                ...state,
                isLogin: localStorage.getItem('isLogin') || state.isLogin,
                userName: localStorage.getItem('userName') || state.userName
            };
    }
}