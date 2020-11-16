import {
    GET_TRACKHISTORY_ERROR,
    GET_TRACKS_ERROR,
    GET_TRACKS_SUCCESS,
    GET_TRACKSHISTORY_SUCCESS, POST_TRACKS_ERROR,
    POST_TRACKS_SUCCESS
} from "../actionTypes";

const initialState = {
    tracks: null,
    error: null,
    tracksHistory: null
};

export const tracksReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_TRACKS_SUCCESS:
            return {
                ...state,
                tracks: action.data,
                error: null
            };
        case GET_TRACKSHISTORY_SUCCESS:
            return {
                ...state,
                tracksHistory: action.data,
                error: null
            };
        case GET_TRACKS_ERROR:
        case GET_TRACKHISTORY_ERROR:
            return {
                ...state,
                error: action.error
            };
        case POST_TRACKS_SUCCESS:
            return {
                ...state,
                error: null
            };
        case POST_TRACKS_ERROR:
            return {
                ...state,
                error: action.error
            };
        default:
            return state;
    }
};