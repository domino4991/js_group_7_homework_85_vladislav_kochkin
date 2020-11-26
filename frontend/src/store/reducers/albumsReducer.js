import {
    DELETE_ALBUM_ERROR, DELETE_ALBUM_SUCCESS,
    GET_ALBUMS_ERROR,
    GET_ALBUMS_SUCCESS,
    POST_ALBUMS_ERROR,
    POST_ALBUMS_SUCCESS,
    PUBLISH_ALBUM_ERROR, PUBLISH_ALBUM_SUCCESS
} from "../actionTypes";

const initialState = {
    albums: null,
    albumsError: null
};

export const albumsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALBUMS_SUCCESS:
            return {
                ...state,
                albums: action.data,
                albumsError: null
            };
        case POST_ALBUMS_SUCCESS:
        case PUBLISH_ALBUM_SUCCESS:
        case DELETE_ALBUM_SUCCESS:
            return {
                ...state,
                albumsError: null
            };
        case GET_ALBUMS_ERROR:
        case POST_ALBUMS_ERROR:
        case PUBLISH_ALBUM_ERROR:
        case DELETE_ALBUM_ERROR:
            return {
                ...state,
                albumsError: action.error
            };
        default:
            return state;
    }
};