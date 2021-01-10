import React from 'react';
import {shallow, mount} from 'enzyme';

import Header from "./Header";
import * as redux from "react-redux";
import {ConnectedRouter} from 'connected-react-router';
import store, {history} from "../../store/configureStore";
import {Provider} from "react-redux";

describe('Header', () => {
    const mockUseSelector = jest.spyOn(redux, 'useSelector');
    const mockUseDispatch = jest.spyOn(redux, 'useDispatch');
    const mockUseState = jest.spyOn(React, 'useState');

    it('test', () => {
        mockUseSelector.mockReturnValue({user: {displayName: 'test', avatar: null}, error: null});

        const mockDisp = jest.fn();
        mockUseDispatch.mockReturnValue(mockDisp);
        const header = shallow(<Header />);
        header.find('.Header__dropdown-btn').simulate('mouseenter');
        console.log(header.find('DropDownMenu').props());
        console.log(header.debug());
        const wrapper = mount(
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <Header />
                </ConnectedRouter>
            </Provider>
        );
        console.log(wrapper.debug());
        expect(header.find('DropDownMenu')).toHaveLength(1);
    });
})