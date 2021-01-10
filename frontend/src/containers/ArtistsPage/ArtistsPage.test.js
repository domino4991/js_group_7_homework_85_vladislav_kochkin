import React from 'react';
import {shallow} from 'enzyme';
import ArtistsPage from "./ArtistsPage";
import * as redux from 'react-redux';

describe('Artists Page test', () => {
    const mockUseSelector = jest.spyOn(redux, 'useSelector');
    const mockUseDispatch = jest.spyOn(redux, 'useDispatch');

    it('test', () => {
        mockUseSelector.mockReturnValue({artists: [1, 2, 3], artistsError: null});
        const mockDisp = jest.fn();
        mockUseDispatch.mockReturnValue(mockDisp);
        const artistPage = shallow(<ArtistsPage />);
        console.log(artistPage.debug());
        expect(artistPage.find('ArtistItems')).toHaveLength(1);
    });
    it('test error', () => {
        mockUseSelector.mockReturnValue({artists: null, artistsError: 'Error'});
        const mockDisp = jest.fn();
        mockUseDispatch.mockReturnValue(mockDisp);
        const artistPage = shallow(<ArtistsPage />);
        console.log(artistPage.debug());
        expect(artistPage.find('p')).toHaveLength(1);
    });
});