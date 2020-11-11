import React from 'react';
import './TrackItem.css';
import {urlApi} from "../../constants";

const TrackItem = ({tracks}) => {
    const path = urlApi + '/uploads/' + tracks[0].album.image;
    return (
        <div className="Tracks-item">
            <div className="Tracks-item__box-img">
                <img
                    src={path}
                    alt={tracks[0].album.name}
                    className="Tracks-item__img"
                />
            </div>
            <div className="Tracks-item__content">
                <p className="Tracks-item__artist-name Tracks-item__text">Исполнитель: <span>{tracks[0].album.artist.name}</span></p>
                <p className="Tracks-item__album-name Tracks-item__text">Альбом: <span>{tracks[0].album.name}</span></p>
                <ul className="Tracks-item__list">
                    <p>Треклист: </p>
                    {tracks.map(item => <li
                        key={item._id}
                        className="Tracks-item__list-item"
                    >
                        {item.trackNumber}. {item.name} --- {item.duration}
                    </li>)}
                </ul>
            </div>
        </div>
    );
};

export default TrackItem;