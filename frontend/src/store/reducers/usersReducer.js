import {LOGIN_USER_ERROR, LOGIN_USER_SUCCESS, REGISTER_USER_ERROR, REGISTER_USER_SUCCESS} from "../actionTypes";

const initialState = {
    user: null,
    error: null
};

export const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_USER_SUCCESS:
            return {
                ...state,
                error: null
            };
        case LOGIN_USER_SUCCESS:
            return {
                ...state,
                user: action.data,
                error: null
            };
        case REGISTER_USER_ERROR:
        case LOGIN_USER_ERROR:
            return {
                ...state,
                error: action.error
            };
        default:
            return state;
    }
};