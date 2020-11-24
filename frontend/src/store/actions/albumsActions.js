import {GET_ALBUMS_ERROR, GET_ALBUMS_SUCCESS, POST_ALBUMS_ERROR, POST_ALBUMS_SUCCESS} from "../actionTypes";
import axiosBase from "../../axiosBase";
import {toast} from "react-toastify";

const getAlbumsSuccess = data => ({type: GET_ALBUMS_SUCCESS, data});
const getAlbumsError = error => ({type: GET_ALBUMS_ERROR, error});
const postNewAlbumSuccess = () => ({type: POST_ALBUMS_SUCCESS});
const postNewAlbumError = error => ({type: POST_ALBUMS_ERROR, error});

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