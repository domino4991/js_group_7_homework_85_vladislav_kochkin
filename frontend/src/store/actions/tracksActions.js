import {GET_TRACKS_ERROR, GET_TRACKS_SUCCESS} from "../actionTypes";
import {axiosBase} from "../../axiosBase";

const getTracksSuccess = data => ({type: GET_TRACKS_SUCCESS, data});
const getTracksError = error => ({type: GET_TRACKS_ERROR, error});

export const getTracks = query => {
    return async dispatch => {
        try {
            const response = await axiosBase.get(`/tracks${query}`);
            dispatch(getTracksSuccess(response.data));
        } catch (e) {
            dispatch(getTracksError(e));
        }
    };
};