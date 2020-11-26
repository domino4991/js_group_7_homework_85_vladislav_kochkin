import {
    DELETE_TRACK_ERROR,
    DELETE_TRACK_SUCCESS,
    GET_TRACKHISTORY_ERROR,
    GET_TRACKS_ERROR,
    GET_TRACKS_SUCCESS,
    GET_TRACKSHISTORY_SUCCESS, POST_NEW_TRACK_ERROR, POST_NEW_TRACK_SUCCESS,
    POST_TRACKS_ERROR,
    POST_TRACKS_SUCCESS, PUBLISH_TRACK_ERROR, PUBLISH_TRACK_SUCCESS
} from "../actionTypes";
import axiosBase from "../../axiosBase";
import {toast} from "react-toastify";

const getTracksSuccess = data => ({type: GET_TRACKS_SUCCESS, data});
const getTracksError = error => ({type: GET_TRACKS_ERROR, error});
const postTracksSuccess = () => ({type: POST_TRACKS_SUCCESS});
const postTracksError = error => ({type: POST_TRACKS_ERROR, error});
const getTrackHistorySuccess = data => ({type: GET_TRACKSHISTORY_SUCCESS, data});
const getTracksHistoryError = error => ({type: GET_TRACKHISTORY_ERROR, error});
const postNewTrackSuccess = () => ({type: POST_NEW_TRACK_SUCCESS});
const postNewTrackError = error => ({type: POST_NEW_TRACK_ERROR, error});
const publishTrackSuccess = () => ({type: PUBLISH_TRACK_SUCCESS});
const publishTrackError = error => ({type: PUBLISH_TRACK_ERROR, error});
const deleteTrackSuccess = () => ({type: DELETE_TRACK_SUCCESS});
const deleteTrackError = error => ({type: DELETE_TRACK_ERROR, error});

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

export const getTracksAdmin = () => {
    return async dispatch => {
        try {
            const response = await axiosBase.get(`/tracks/admin`);
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

export const getTracksUser = () => {
    return async dispatch => {
        try {
            const response = await axiosBase.get(`/tracks/users`);
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
    return async dispatch => {
        try {
            await axiosBase.post('/track_history', {track: trackId});
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
};

export const postNewTrack = data => {
    return async dispatch => {
        try {
            const response = await axiosBase.post('/tracks', data);
            toast.success(response.data.message);
            dispatch(postNewTrackSuccess());
        } catch (e) {
            if(e.response && e.response.data) {
                dispatch(postNewTrackError(e.response.data));
            } else {
                dispatch(postNewTrackError(e.message));
            }
        }
    };
};

export const publishTrack = (id, data) => {
    return async dispatch => {
        try {
            const response = await axiosBase.put(`/tracks/${id}/publish`, {isPublished: data});
            toast.success(response.data.message);
            dispatch(publishTrackSuccess());
            dispatch(getTracksAdmin());
        } catch (e) {
            if(e.response && e.response.data) {
                dispatch(publishTrackError(e.response.data.error));
            } else {
                dispatch(publishTrackError(e.message));
            }
        }
    };
};

export const deleteTrack = id => {
    return async dispatch => {
        try {
            const response = await axiosBase.delete(`/tracks/${id}`);
            toast.success(response.data.message);
            dispatch(deleteTrackSuccess());
            dispatch(getTracksAdmin());
        } catch (e) {
            if(e.response && e.response.data) {
                dispatch(deleteTrackError(e.response.data.error));
            } else {
                dispatch(deleteTrackError(e.message));
            }
        }
    };
};