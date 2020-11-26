import React from 'react';
import './TrackItem.css';
import {urlApi} from "../../constants";
import PropTypes from 'prop-types';
import {useDispatch} from "react-redux";
import {postTracks} from "../../store/actions/tracksActions";
import H5AudioPlayer from "react-h5-audio-player";
import 'react-h5-audio-player/lib/styles.css';

const TrackItem = ({tracks}) => {
    const path = urlApi + '/uploads/' + tracks[0].album.image;
    const pathAudio = urlApi + '/uploads/audio/';
    const dispatch = useDispatch();

    if(!tracks[0].album.artist) return null;

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
                        className={item.audioFile ? "Tracks-item__list-item audioFile" : "Tracks-item__list-item"}
                    >
                        {!item.audioFile ?
                            <button
                                type="button"
                                className="Tracks-item__list-btn"
                                onClick={() => dispatch(postTracks(item._id))}
                            >
                                {item.trackNumber}. {item.name} --- {item.duration}
                            </button>
                            :
                            <H5AudioPlayer
                                src={pathAudio + item.audioFile}
                                onPlay={() => dispatch(postTracks(item._id))}
                                header={`${item.trackNumber}. ${item.name}`}
                            />
                        }
                    </li>)}
                </ul>
            </div>
        </div>
    );
};

TrackItem.propTypes = {
    tracks: PropTypes.array.isRequired
};

export default TrackItem;