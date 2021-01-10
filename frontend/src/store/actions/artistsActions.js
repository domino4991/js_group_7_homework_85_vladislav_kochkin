import {
    DELETE_ARTIST_ERROR,
    DELETE_ARTIST_SUCCESS,
    GET_ARTISTS_ERROR,
    GET_ARTISTS_SUCCESS,
    POST_NEW_ARTISTS_ERROR,
    POST_NEW_ARTISTS_SUCCESS, PUBLISH_ARTIST_ERROR,
    PUBLISH_ARTIST_SUCCESS
} from "../actionTypes";
import axiosBase from "../../axiosBase";
import {toast} from "react-toastify";

export const getArtistsSuccess = data => ({type: GET_ARTISTS_SUCCESS, data});
export const getArtistsError = error => ({type: GET_ARTISTS_ERROR, error});
export const postNewArtistSuccess = () => ({type: POST_NEW_ARTISTS_SUCCESS});
export const postNewArtistError = error => ({type: POST_NEW_ARTISTS_ERROR, error});
export const publishArtistSuccess = () => ({type: PUBLISH_ARTIST_SUCCESS});
export const publishArtistError = error => ({type: PUBLISH_ARTIST_ERROR, error});
export const deleteArtistSuccess = () => ({type: DELETE_ARTIST_SUCCESS});
export const deleteArtistError = error => ({type: DELETE_ARTIST_ERROR, error});

export const getArtists = () => {
    return async dispatch => {
        try {
            const response = await axiosBase.get('/artists');
            dispatch(getArtistsSuccess(response.data));
        } catch (e) {
            if(e.message === 'Network Error') {
                dispatch(getArtistsError(e.message));
            } else {
                dispatch(getArtistsError(e.response.data.error));
            }
        }
    };
};

export const getFormArtists = () => {
    return async dispatch => {
        try {
            const response = await axiosBase.get('/artists/form');
            dispatch(getArtistsSuccess(response.data));
        } catch (e) {
            if(e.response && e.response.data) {
                dispatch(getArtistsError(e.response.data.error));
            } else {
                dispatch(getArtistsError(e.message));
            }
        }
    };
};

export const getArtistsAdmin = () => {
    return async dispatch => {
        try {
            const response = await axiosBase.get('/artists/admin');
            dispatch(getArtistsSuccess(response.data));
        } catch (e) {
            if(e.response && e.response.data) {
                dispatch(getArtistsError(e.response.data.error));
            } else {
                dispatch(getArtistsError(e.message));
            }
        }
    };
};

export const getArtistUser = () => {
    return async dispatch => {
        try {
            const response = await axiosBase.get('/artists/users');
            dispatch(getArtistsSuccess(response.data));
        } catch (e) {
            if(e.response && e.response.data) {
                dispatch(getArtistsError(e.response.data.error));
            } else {
                dispatch(getArtistsError(e.message));
            }
        }
    };
};

export const postNewArtist = data => {
    return async dispatch => {
        try {
            const response = await axiosBase.post('/artists', data);
            toast.success(response.data.message);
            dispatch(postNewArtistSuccess());
        } catch (e) {
            if(e.response && e.response.data) {
                dispatch(postNewArtistError(e.response.data));
            } else {
                dispatch(postNewArtistError(e.message));
            }
        }
    };
};

export const publishArtist = (id, data) => {
    return async dispatch => {
        try {
            const response = await axiosBase.put(`/artists/${id}/publish`, {isPublished: data});
            toast.success(response.data.message);
            dispatch(publishArtistSuccess());
            dispatch(getArtistsAdmin());
        } catch (e) {
            if(e.response && e.response.data) {
                dispatch(publishArtistError(e.response.data.error));
            } else {
                dispatch(publishArtistError(e.message));
            }
        }
    };
};

export const deleteArtist = id => {
    return async dispatch => {
        try {
            const response = await axiosBase.delete(`/artists/${id}`);
            toast.success(response.data.message);
            dispatch(deleteArtistSuccess());
            dispatch(getArtistsAdmin());
        } catch (e) {
            if(e.response && e.response.data) {
                dispatch(deleteArtistError(e.response.data.error));
            } else {
                dispatch(deleteArtistError(e.message));
            }
        }
    };
};