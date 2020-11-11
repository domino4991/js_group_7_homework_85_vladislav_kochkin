import React, {useEffect} from 'react';
import './ArtistsPage.css';
import {useDispatch, useSelector} from "react-redux";
import {getArtists} from "../../store/actions/artistsActions";
import ArtistItems from "../../components/ArtistItems/ArtistItems";

const ArtistsPage = () => {
    const {artists} = useSelector(state => state.artists);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getArtists());
    }, [dispatch]);

    return (
        <section className="Artist-page">
            <div className="container">
                <h2 className="Artist-page__title">Исполнители</h2>
                <ArtistItems
                    artists={artists}
                />
            </div>
        </section>
    );
};

export default ArtistsPage;