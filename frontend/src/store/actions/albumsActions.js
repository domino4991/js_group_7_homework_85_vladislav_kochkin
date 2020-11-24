import {GET_ALBUMS_ERROR, GET_ALBUMS_SUCCESS} from "../actionTypes";
import axiosBase from "../../axiosBase";

const getAlbumsSuccess = data => ({type: GET_ALBUMS_SUCCESS, data});
const getAlbumsError = error => ({type: GET_ALBUMS_ERROR, error});

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
}