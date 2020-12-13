import React from 'react';
import PropTypes from 'prop-types';
import './TrackForm.css';

const TrackForm = ({
    name,
    duration,
    trackNumber,
    submitted,
    getFieldError,
    changed,
    changedFile,
    artist,
    artists,
    albums,
    album
}) => {
    return (
        <form
            className="Form"
            onSubmit={submitted}
        >
            <input
                type="text"
                name="name"
                value={name}
                onChange={changed}
                placeholder="Enter track name"
                className="Form__fields"
                id="track-name"
                required
            />
            {
                getFieldError('name')
                &&
                <label
                    htmlFor="track-name"
                    className="Form__error-label"
                >{getFieldError('name')}</label>
            }
            <input
                type="text"
                name="duration"
                value={duration}
                onChange={changed}
                placeholder="Enter duration track"
                className="Form__fields"
                id="track-duration"
                required
            />
            {
                getFieldError('duration')
                &&
                <label
                    htmlFor="track-duration"
                    className="Form__error-label"
                >{getFieldError('duration')}</label>
            }
            <input
                type="text"
                name="trackNumber"
                value={trackNumber}
                onChange={changed}
                placeholder="Enter trackNumber"
                className="Form__fields"
                id="track-trackNumber"
                required
            />
            {
                getFieldError('trackNumber')
                &&
                <label
                    htmlFor="track-trackNumber"
                    className="Form__error-label"
                >{getFieldError('trackNumber')}</label>
            }
            <div
                className="fileInput-box"
            >
                <label
                    htmlFor="track-audioFile"
                    className="Form__label"
                >Track: </label>
                <input
                    type="file"
                    name="audioFile"
                    onChange={changedFile}
                    className="Form__fields"
                    id="track-audioFile"
                    accept="audio/*"
                />
                {
                    getFieldError('audioFile')
                    &&
                    <label
                        htmlFor="track-audioFile"
                        className="Form__error-label"
                    >{getFieldError('audioFile')}</label>
                }
            </div>
            <select
                name="artist"
                className="Form__fields"
                id="artist-list"
                value={artist}
                onChange={changed}
                required
            >
                <option value="">Выберите исполнителя...</option>
                {artists && artists.map(artist => <option
                    key={artist._id}
                    value={artist._id}
                >
                    {artist.name}
                </option>)}
            </select>
            <select
                name="album"
                className="Form__fields"
                id="album-list"
                value={album}
                onChange={changed}
                disabled={!artist}
                required
            >
                <option value="">Выберите альбом...</option>
                {albums && albums.map(album => <option
                    key={album._id}
                    value={album._id}
                >
                    {album.name}
                </option>)}
            </select>
            <button type="submit" className="Form__btn" id="formBtn">Create</button>
        </form>
    );
};

TrackForm.propTypes = {
    name: PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired,
    trackNumber: PropTypes.string.isRequired,
    submitted: PropTypes.func.isRequired,
    getFieldError: PropTypes.func.isRequired,
    changed: PropTypes.func.isRequired,
    changedFile: PropTypes.func.isRequired,
    artist: PropTypes.string.isRequired,
    artists: PropTypes.any.isRequired
};

export default TrackForm;