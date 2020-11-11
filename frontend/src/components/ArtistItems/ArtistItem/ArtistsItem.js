import React from 'react';
import './ArtistItem.css';
import {urlApi} from "../../../constants";
import {NavLink} from "react-router-dom";

const ArtistsItem = ({name, image, id}) => {
    const path = urlApi + "/uploads/" + image;
    return (
        <NavLink
            to={`/albums?artist=${id}`}
            className='Artist-item'
        >
            <div className="Artist-item__content">
                {image && <div className="Artist-item__box-img">
                    <img
                        src={path}
                        alt={name}
                        className="Artist-item__img"
                    />
                </div>}
                <h3>{name}</h3>
            </div>
        </NavLink>
    );
};

export default ArtistsItem;