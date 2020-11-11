import React from 'react';
import './AlbumsItems.css';
import AlbumsItem from "./AlbumsItem/AlbumsItem";

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

export default AlbumsItems;