import {GET_ARTISTS_ERROR, GET_ARTISTS_SUCCESS} from "../actionTypes";
import {axiosBase} from "../../axiosBase";

const getArtistsSuccess = data => ({type: GET_ARTISTS_SUCCESS, data});
const getArtistsError = error => ({type: GET_ARTISTS_ERROR, error});

export const getArtists = () => {
    return async dispatch => {
        try {
            const response = await axiosBase.get('/artists');
            dispatch(getArtistsSuccess(response.data));
        } catch (e) {
            dispatch(getArtistsError(e));
        }
    };
}