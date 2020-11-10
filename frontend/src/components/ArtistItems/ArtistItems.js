import React from 'react';
import './ArtistItems.css';
import ArtistsItem from "./ArtistItem/ArtistsItem";

const ArtistItems = ({artists}) => {
    return (
        <div className="Artist-items">
            {artists.map(item => <ArtistsItem
                key={item._id}
                name={item.name}
                image={item.image}
                info={item.info}
            />)}
        </div>
    );
};

export default ArtistItems;