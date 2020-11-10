import React from 'react';
import './ArtistItem.css';
import {urlApi} from "../../../constants";

const ArtistsItem = ({name, image, info}) => {
    const path = urlApi + "/uploads/" + image;
    return (
        <div className="Artist-item">
            {image && <img
                src={path}
                alt={name}
                className="Artist-item__img"
            />}
            <h3>{name}</h3>
            <p>{info}</p>
        </div>
    );
};

export default ArtistsItem;