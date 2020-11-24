import {GET_ARTISTS_ERROR, GET_ARTISTS_SUCCESS, POST_NEW_ARTISTS_ERROR, POST_NEW_ARTISTS_SUCCESS} from "../actionTypes";
import axiosBase from "../../axiosBase";
import {toast} from "react-toastify";

const getArtistsSuccess = data => ({type: GET_ARTISTS_SUCCESS, data});
const getArtistsError = error => ({type: GET_ARTISTS_ERROR, error});
const postNewArtistSuccess = () => ({type: POST_NEW_ARTISTS_SUCCESS});
const postNewArtistError = error => ({type: POST_NEW_ARTISTS_ERROR, error});

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