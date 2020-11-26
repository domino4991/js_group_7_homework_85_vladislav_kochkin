import {
    DELETE_TRACK_ERROR, DELETE_TRACK_SUCCESS,
    GET_TRACKHISTORY_ERROR,
    GET_TRACKS_ERROR,
    GET_TRACKS_SUCCESS,
    GET_TRACKSHISTORY_SUCCESS, POST_NEW_TRACK_ERROR, POST_NEW_TRACK_SUCCESS, POST_TRACKS_ERROR,
    POST_TRACKS_SUCCESS, PUBLISH_TRACK_ERROR, PUBLISH_TRACK_SUCCESS
} from "../actionTypes";

const initialState = {
    tracks: null,
    tracksError: null,
    tracksHistory: null
};

export const tracksReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_TRACKS_SUCCESS:
            return {
                ...state,
                tracks: action.data,
                tracksError: null
            };
        case GET_TRACKSHISTORY_SUCCESS:
            return {
                ...state,
                tracksHistory: action.data,
                tracksError: null
            };
        case POST_NEW_TRACK_SUCCESS:
        case POST_TRACKS_SUCCESS:
        case PUBLISH_TRACK_SUCCESS:
        case DELETE_TRACK_SUCCESS:
            return {
                ...state,
                tracksError: null
            };
        case GET_TRACKS_ERROR:
        case GET_TRACKHISTORY_ERROR:
        case POST_NEW_TRACK_ERROR:
        case PUBLISH_TRACK_ERROR:
        case DELETE_TRACK_ERROR:
        case POST_TRACKS_ERROR:
            return {
                ...state,
                tracksError: action.error
            };
        default:
            return state;
    }
};