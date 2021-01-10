import {getArtistsSuccess, getArtistsError, getArtists} from '../artistsActions';
import {GET_ARTISTS_ERROR, GET_ARTISTS_SUCCESS} from "../../actionTypes";

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axiosBase from "../../../axiosBase";
import MockAdapter from 'axios-mock-adapter';
import {initialState} from "../../reducers/artistsReducer";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const mock = new MockAdapter(axiosBase);

describe('Artist actions', () => {
    it('getArtistsSuccess', () => {
        const expectedAction = {
            type: GET_ARTISTS_SUCCESS,
            data: [1, 2, 3]
        };
        expect(getArtistsSuccess(expectedAction.data)).toEqual(expectedAction);
    });

    it('getArtistsError', () => {
        const expectedAction = {
            type: GET_ARTISTS_ERROR,
            error: 'Some error'
        };
        expect(getArtistsError(expectedAction.error)).toEqual(expectedAction)
    });

    describe('Async getArtists action', () => {
        let store;
        beforeEach(() => {
            store = mockStore(initialState);
        });

        afterEach(() => {
            store.clearActions();
        });

        it('создание GET_ARTISTS_SUCCESS когда запрос прошел успешно',() => {
            mock.onGet('/artists').reply(200, [1, 2, 3]);
            return store.dispatch(getArtists()).then(() => {
                let expectedActions = [
                    getArtistsSuccess([1, 2, 3])
                ];
                expect(store.getActions()).toEqual(expectedActions);
            });
        });
        it('ошибка получения артистов GET_ARTISTS_ERROR', () => {
            mock.onGet('/artists').reply(404, {error: 'Нет артистов'});
            return store.dispatch(getArtists()).then(() => {
                let expectedActions = [
                    getArtistsError('Нет артистов')
                ];
                expect(store.getActions()).toEqual(expectedActions);
            })
        })
    });
});