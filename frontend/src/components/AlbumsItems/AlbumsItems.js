import React from 'react';
import './AlbumsItems.css';
import AlbumsItem from "./AlbumsItem/AlbumsItem";
import PropTypes from 'prop-types';

const AlbumsItems = ({albums}) => {
    return (
        <div className="Albums-items">
            <h3 className="Albums-items__title">Альбомы</h3>
            {albums && albums.map(item => <AlbumsItem
                key={item._id}
                albumName={item.name}
                albumYear={item.year}
                albumCover={item.image}
                id={item._id}
                trackCount={item.count}
            />)}
        </div>
    );
};

AlbumsItems.propTypes = {
    albums: PropTypes.array.isRequired
};

export default AlbumsItems;