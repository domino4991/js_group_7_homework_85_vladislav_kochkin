import React, {useEffect} from 'react';
import './AlbumsPage.css';
import {useDispatch, useSelector} from "react-redux";
import {getAlbums} from "../../store/actions/albumsActions";
import AlbumsItems from "../../components/AlbumsItems/AlbumsItems";
import ArtistDetail from "../../components/ArtistDetail/ArtistDetail";

const AlbumsPage = props => {
    const {albums} = useSelector(state => state.albums);
    const dispatch = useDispatch();
    const query = props.location.search;

    useEffect(() => {
        dispatch(getAlbums(query));
    }, [dispatch, query]);

    return (
        <section className="Albums-page">
            <div className="container">
                <ArtistDetail
                    name={albums && albums[0].artist.name}
                    info={albums && albums[0].artist.info}
                />
                <AlbumsItems
                    albums={albums}
                />
            </div>
        </section>
    );
};

export default AlbumsPage;