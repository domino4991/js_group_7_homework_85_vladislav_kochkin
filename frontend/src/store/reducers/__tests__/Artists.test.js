import {initialState, artistsReducer} from '../artistsReducer';
import {GET_ARTISTS_ERROR, GET_ARTISTS_SUCCESS} from "../../actionTypes";

describe('тесты артистов', () => {
    it('GET_ARTISTS_SUCCESS', () => {

        const action = {
            type: GET_ARTISTS_SUCCESS,
            data: [1, 2, 3]
        };

        expect(artistsReducer(initialState, action)).toEqual({
            ...initialState,
            artists: action.data,
        });
    });

    it('GET_ARTISTS_ERROR', () => {
        const action = {
            type: GET_ARTISTS_ERROR,
            error: 'Errors'
        };

        expect(artistsReducer(initialState, action)).toEqual({
            ...initialState,
            artistsError: action.error
        });
    });
});