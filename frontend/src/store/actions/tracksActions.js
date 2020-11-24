import {
    GET_TRACKHISTORY_ERROR,
    GET_TRACKS_ERROR,
    GET_TRACKS_SUCCESS,
    GET_TRACKSHISTORY_SUCCESS,
    POST_TRACKS_ERROR,
    POST_TRACKS_SUCCESS
} from "../actionTypes";
import axiosBase from "../../axiosBase";
import {push} from 'connected-react-router';
import {toast} from "react-toastify";

const getTracksSuccess = data => ({type: GET_TRACKS_SUCCESS, data});
const getTracksError = error => ({type: GET_TRACKS_ERROR, error});
const postTracksSuccess = () => ({type: POST_TRACKS_SUCCESS});
const postTracksError = error => ({type: POST_TRACKS_ERROR, error});
const getTrackHistorySuccess = data => ({type: GET_TRACKSHISTORY_SUCCESS, data});
const getTracksHistoryError = error => ({type: GET_TRACKHISTORY_ERROR, error});

export const getTracks = query => {
    return async dispatch => {
        try {
            const response = await axiosBase.get(`/tracks${query}`);
            dispatch(getTracksSuccess(response.data));
        } catch (e) {
            if(e.response && e.response.data) {
                dispatch(getTracksError(e.response.data.error));
            } else {
                dispatch(getTracksError(e.message));
            }
        }
    };
};

export const postTracks = trackId => {
    return async (dispatch, getState) => {
        const headers = {
            "Authorization": getState().users.user && getState().users.user.token
        };
        if(!getState().users.user) {
            return dispatch(push('/login'));
        }
        try {
            await axiosBase.post('/track_history', {track: trackId}, {headers});
            dispatch(postTracksSuccess());
            toast.success('Композиция добавлена в историю.');
        } catch (e) {
            if(e.response && e.response.data) {
                dispatch(postTracksError(e.response.data.error));
                toast.error(e.response.data.error);
            } else {
                dispatch(postTracksError(e.message));
            }
        }
    };
};

export const getTracksHistory = () => {
    return async (dispatch, getState) => {
        const headers = {
            "Authorization": getState().users.user && getState().users.user.token
        };
        try {
            const response = await axiosBase.get('/track_history', {headers});
            dispatch(getTrackHistorySuccess(response.data));
        } catch (e) {
            if(e.response && e.response.data) {
                dispatch(getTracksHistoryError(e.response.data.error));
            } else {
                dispatch(getTracksHistoryError(e.message));
            }
        }
    }
}