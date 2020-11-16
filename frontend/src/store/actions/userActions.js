import {LOGIN_USER_ERROR, LOGIN_USER_SUCCESS, REGISTER_USER_ERROR, REGISTER_USER_SUCCESS} from "../actionTypes";
import {axiosBase} from "../../axiosBase";
import {push} from 'connected-react-router';

const registerUserSuccess = () => ({type: REGISTER_USER_SUCCESS});
const registerUserError = error => ({type: REGISTER_USER_ERROR, error});
const loginUserSuccess = data => ({type: LOGIN_USER_SUCCESS, data});
const loginUserError = error => ({type: LOGIN_USER_ERROR, error});

export const registerUser = userData => {
    return async dispatch => {
        try {
            await axiosBase.post('/users', userData);
            dispatch(registerUserSuccess());
            dispatch(push('/login'));
        } catch (e) {
            if(e.response && e.response.data) {
                dispatch(registerUserError(e.response.data));
            } else {
                dispatch(registerUserError(e.message));
            }
        }
    }
};

export const loginUser = userData => {
    return async dispatch => {
        try {
            const response = await axiosBase.post('/users/sessions', userData);
            dispatch(loginUserSuccess(response.data));
            dispatch(push('/'));
        } catch (e) {
            if(e.response && e.response.data) {
                dispatch(loginUserError(e.response.data.error));
            } else {
                dispatch(loginUserError(e.message));
            }
        }
    }
}