import {GET_ARTISTS_ERROR, GET_ARTISTS_SUCCESS, POST_NEW_ARTISTS_ERROR, POST_NEW_ARTISTS_SUCCESS} from "../actionTypes";

const initialState = {
    artists: null,
    error: null
};

export const artistsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ARTISTS_SUCCESS:
            return {
                ...state,
                artists: action.data,
                error: null
            };
        case POST_NEW_ARTISTS_SUCCESS:
            return {
                ...state,
                error: null
            };
        case GET_ARTISTS_ERROR:
        case POST_NEW_ARTISTS_ERROR:
            return {
                ...state,
                error: action.error
            };
        default:
            return state;
    }
};