import {GET_TRACKS_ERROR, GET_TRACKS_SUCCESS} from "../actionTypes";

const initialState = {
    tracks: null,
    error: null
};

export const tracksReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_TRACKS_SUCCESS:
            return {
                ...state,
                tracks: action.data,
                error: null
            };
        case GET_TRACKS_ERROR:
            return {
                ...state,
                error: action.error
            };
        default:
            return state;
    }
};