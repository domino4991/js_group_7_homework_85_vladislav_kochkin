import React from 'react';
import './ArtistDetail.css';

const ArtistDetail = ({name, info}) => {
    return (
        <div className="Artist-detail">
            <h2 className="Artist-detail__name">{name}</h2>
            <p className="Artist-detail__info">{info}</p>
        </div>
    );
};

export default ArtistDetail;