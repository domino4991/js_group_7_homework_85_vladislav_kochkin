import React from 'react';
import PropTypes from 'prop-types';

const AlbumForm = ({
   name,
   year,
   artists,
   artist,
   submitted,
   changed,
   changedFile,
   getFieldError
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
                placeholder="Enter album name"
                className="Form__fields"
                id="album-name"
                required
            />
            {
                getFieldError('name')
                &&
                <label
                    htmlFor="album-name"
                    className="Form__error-label"
                >{getFieldError('name')}</label>
            }
            <input
                type="text"
                name="year"
                value={year}
                onChange={changed}
                placeholder="Enter release date"
                className="Form__fields"
                id="album-year"
                required
            />
            {
                getFieldError('year')
                &&
                <label
                    htmlFor="album-year"
                    className="Form__error-label"
                >{getFieldError('year')}</label>
            }
            <input
                type="file"
                name="image"
                onChange={changedFile}
                className="Form__fields"
                id="album-image"
                required
            />
            {
                getFieldError('image')
                &&
                <label
                    htmlFor="album-image"
                    className="Form__error-label"
                >{getFieldError('image')}</label>
            }
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
            <button type="submit" className="Form__btn">Create</button>
        </form>
    );
};

AlbumForm.propTypes = {
    name: PropTypes.string.isRequired,
    year: PropTypes.string.isRequired,
    artists: PropTypes.any.isRequired,
    artist: PropTypes.string.isRequired,
    submitted: PropTypes.func.isRequired,
    changed: PropTypes.func.isRequired,
    changedFile: PropTypes.func.isRequired,
    getFieldError: PropTypes.func.isRequired
};

export default AlbumForm;