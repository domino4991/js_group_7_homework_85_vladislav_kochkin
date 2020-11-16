import React from 'react';
import './ArtistDetail.css';
import PropTypes from 'prop-types';

const ArtistDetail = ({name, info}) => {
    return (
        <div className="Artist-detail">
            <h2 className="Artist-detail__name">{name}</h2>
            <p className="Artist-detail__info">{info}</p>
        </div>
    );
};

ArtistDetail.propTypes = {
    name: PropTypes.string.isRequired,
    info: PropTypes.string.isRequired
};

export default ArtistDetail;