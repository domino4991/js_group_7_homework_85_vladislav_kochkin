import {
    DELETE_ALBUM_ERROR,
    DELETE_ALBUM_SUCCESS,
    GET_ALBUMS_ERROR,
    GET_ALBUMS_SUCCESS,
    POST_ALBUMS_ERROR,
    POST_ALBUMS_SUCCESS, PUBLISH_ALBUM_ERROR,
    PUBLISH_ALBUM_SUCCESS
} from "../actionTypes";
import axiosBase from "../../axiosBase";
import {toast} from "react-toastify";

const getAlbumsSuccess = data => ({type: GET_ALBUMS_SUCCESS, data});
const getAlbumsError = error => ({type: GET_ALBUMS_ERROR, error});
const postNewAlbumSuccess = () => ({type: POST_ALBUMS_SUCCESS});
const postNewAlbumError = error => ({type: POST_ALBUMS_ERROR, error});
const publishAlbumSuccess = () => ({type: PUBLISH_ALBUM_SUCCESS});
const publishAlbumError = error => ({type: PUBLISH_ALBUM_ERROR, error});
const deleteAlbumSuccess = () => ({type: DELETE_ALBUM_SUCCESS});
const deleteAlbumError = error => ({type: DELETE_ALBUM_ERROR, error});

export const getAlbums = query => {
    return async dispatch => {
        try {
            const response = await axiosBase.get(`/albums${query}`);
            dispatch(getAlbumsSuccess(response.data));
        } catch (e) {
            if(e.message === 'Network Error') {
                dispatch(getAlbumsError(e.message));
            } else {
                dispatch(getAlbumsError(e.response.data.error));
            }
        }
    };
};

export const getFormAlbums = query => {
    return async dispatch => {
        try {
            const response = await axiosBase.get(`/albums/form?artist=${query}`);
            dispatch(getAlbumsSuccess(response.data));
        } catch (e) {
            if(e.response && e.response.data) {
                dispatch({type: 'CLEAR_ALBUMS'});
                dispatch(getAlbumsError(e.response.data.error));
            } else {
                dispatch(getAlbumsError(e.message));
            }
        }
    };
};

export const getAlbumsAdmin = () => {
    return async dispatch => {
        try {
            const response = await axiosBase.get(`/albums/admin`);
            dispatch(getAlbumsSuccess(response.data));
        } catch (e) {
            if(e.message === 'Network Error') {
                dispatch(getAlbumsError(e.message));
            } else {
                dispatch(getAlbumsError(e.response.data.error));
            }
        }
    };
};

export const getAlbumsUser = () => {
    return async dispatch => {
        try {
            const response = await axiosBase.get(`/albums/users`);
            dispatch(getAlbumsSuccess(response.data));
        } catch (e) {
            if(e.message === 'Network Error') {
                dispatch(getAlbumsError(e.message));
            } else {
                dispatch(getAlbumsError(e.response.data.error));
            }
        }
    };
};

export const postNewAlbum = data => {
    return async dispatch => {
        try {
            const response = await axiosBase.post('/albums', data);
            toast.success(response.data.message);
            dispatch(postNewAlbumSuccess());
        } catch (e) {
            if(e.response && e.response.data) {
                dispatch(postNewAlbumError(e.response.data));
            } else {
                dispatch(postNewAlbumError(e.message));
            }
        }
    };
};

export const publishAlbum = (id, data) => {
    return async dispatch => {
        try {
            const response = await axiosBase.put(`/albums/${id}/publish`, {isPublished: data});
            toast.success(response.data.message);
            dispatch(publishAlbumSuccess());
            dispatch(getAlbumsAdmin());
        } catch (e) {
            if(e.response && e.response.data) {
                dispatch(publishAlbumError(e.response.data.error));
            } else {
                dispatch(publishAlbumError(e.message));
            }
        }
    };
};

export const deleteAlbum = id => {
    return async dispatch => {
        try {
            const response = await axiosBase.delete(`/albums/${id}`);
            toast.success(response.data.message);
            dispatch(deleteAlbumSuccess());
            dispatch(getAlbumsAdmin());
        } catch (e) {
            if(e.response && e.response.data) {
                dispatch(deleteAlbumError(e.response.data.error));
            } else {
                dispatch(deleteAlbumError(e.message));
            }
        }
    };
};