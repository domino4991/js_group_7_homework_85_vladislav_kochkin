import React from 'react';
import PropTypes from 'prop-types';

const ArtistForm = ({
    name,
    info,
    changed,
    getFieldError,
    changedFile,
    submitted
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
                placeholder="Enter artist name"
                className="Form__fields"
                id="artist-name"
                required
            />
            {
                getFieldError('name')
                &&
                <label
                    htmlFor="artist-name"
                    className="Form__error-label"
                >{getFieldError('name')}</label>
            }
            <textarea
                name="info"
                value={info}
                onChange={changed}
                placeholder="Enter artist info"
                className="Form__fields Form__fields_textarea"
                id="artist-info"
                required
            />
            {
                getFieldError('info')
                &&
                <label
                    htmlFor="artist-info"
                    className="Form__error-label"
                >{getFieldError('info')}</label>
            }
            <input
                type="file"
                name="image"
                onChange={changedFile}
                className="Form__fields"
                id="artist-image"
                required
            />
            {
                getFieldError('image')
                &&
                <label
                    htmlFor="artist-image"
                    className="Form__error-label"
                >{getFieldError('image')}</label>
            }
            <button type="submit" className="Form__btn" id='formBtn'>Create</button>
        </form>
    );
};

ArtistForm.propTypes = {
    name: PropTypes.string.isRequired,
    info: PropTypes.string.isRequired,
    changed: PropTypes.func.isRequired,
    changedFile: PropTypes.func.isRequired,
    getFieldError: PropTypes.func.isRequired,
    submitted: PropTypes.func.isRequired
};

export default ArtistForm;