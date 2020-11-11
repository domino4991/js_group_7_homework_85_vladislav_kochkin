import {GET_ALBUMS_ERROR, GET_ALBUMS_SUCCESS} from "../actionTypes";

const initialState = {
    albums: null,
    error: null
};

export const albumsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALBUMS_SUCCESS:
            return {
                ...state,
                albums: action.data,
                error: null
            };
        case GET_ALBUMS_ERROR:
            return {
                ...state,
                error: action.error
            };
        default:
            return state;
    }
};