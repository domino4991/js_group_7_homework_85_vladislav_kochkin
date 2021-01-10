// import React from 'react';
// import { shallow } from 'enzyme';
// import ArtistsItem from "../ArtistItems/ArtistItem/ArtistsItem";
// import {NavLink} from "react-router-dom";
//
//
// describe('Artist item', () => {
//     it('Должны прийти данные в пропсы', () => {
//         const data = {
//             name: 'Test',
//             image: 'architects.jpg',
//             id: '123'
//         }
//        const output = shallow(
//            <ArtistsItem image={data.image} id={data.id} name={data.name} />
//        );
//         expect(output.find(NavLink).first().props().to).toEqual(`/albums?artist=${data.id}`);
//     });
// });