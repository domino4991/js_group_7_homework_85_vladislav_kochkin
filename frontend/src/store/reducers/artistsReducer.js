import {
    DELETE_ARTIST_ERROR, DELETE_ARTIST_SUCCESS,
    GET_ARTISTS_ERROR,
    GET_ARTISTS_SUCCESS,
    POST_NEW_ARTISTS_ERROR,
    POST_NEW_ARTISTS_SUCCESS,
    PUBLISH_ARTIST_ERROR, PUBLISH_ARTIST_SUCCESS
} from "../actionTypes";

const initialState = {
    artists: null,
    artistsError: null
};

export const artistsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ARTISTS_SUCCESS:
            return {
                ...state,
                artists: action.data,
                artistsError: null
            };
        case POST_NEW_ARTISTS_SUCCESS:
        case PUBLISH_ARTIST_SUCCESS:
        case DELETE_ARTIST_SUCCESS:
            return {
                ...state,
                artistsError: null
            };
        case GET_ARTISTS_ERROR:
        case POST_NEW_ARTISTS_ERROR:
        case PUBLISH_ARTIST_ERROR:
        case DELETE_ARTIST_ERROR:
            return {
                ...state,
                artistsError: action.error
            };
        default:
            return state;
    }
};