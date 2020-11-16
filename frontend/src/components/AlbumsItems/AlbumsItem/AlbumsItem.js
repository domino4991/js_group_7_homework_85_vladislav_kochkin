import React from 'react';
import './AlbumsItem.css';
import {NavLink} from "react-router-dom";
import {urlApi} from "../../../constants";
import PropTypes from 'prop-types';

const AlbumsItem = (
    {
        id,
        albumCover,
        albumYear,
        albumName,
        trackCount
    }
    ) => {
    const path = urlApi + "/uploads/" + albumCover;
    return (
        <NavLink
            to={`/tracks?album=${id}`}
            className="Album-item"
        >
            <div className="Album-item__box-img">
                <img
                    src={path}
                    alt={albumName}
                    className="Album-item__img"
                />
            </div>
            <div className="Album-item__body">
                <h3 className="Album-item__album-name">{albumName}</h3>
                <p className="Album-item__album-release">Год выпуска: {albumYear}</p>
                <p className="Album-item__album-track-count">Количество композиций: {trackCount}</p>
            </div>
        </NavLink>
    );
};

AlbumsItem.propTypes = {
    id: PropTypes.string.isRequired,
    albumCover: PropTypes.string.isRequired,
    albumYear: PropTypes.number.isRequired,
    albumName: PropTypes.string.isRequired,
    trackCount: PropTypes.number.isRequired
};

export default AlbumsItem;