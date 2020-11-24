import React from 'react';
import './ArtistItems.css';
import ArtistsItem from "./ArtistItem/ArtistsItem";
import PropTypes from 'prop-types';

const ArtistItems = ({artists}) => {
    return (
        <div className="Artist-items">
            {artists && artists.map(item => item.isPublished && <ArtistsItem
                key={item._id}
                name={item.name}
                image={item.image}
                id={item._id}
            />)}
        </div>
    );
};

ArtistItems.propTypes = {
    artists: PropTypes.array.isRequired
};

export default ArtistItems;