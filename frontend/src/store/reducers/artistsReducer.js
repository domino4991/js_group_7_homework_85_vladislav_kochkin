import {GET_ARTISTS_SUCCESS} from "../actionTypes";

const initialState = {
    artists: null,
    error: null
};

export const artistsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ARTISTS_SUCCESS:
            return {
                ...state,
                artists: action.data
            };
        default:
            return state;
    }
};