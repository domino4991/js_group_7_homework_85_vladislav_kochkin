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
        <div>
            <ArtistItems
                artists={artists}
            />
        </div>
    );
};

export default ArtistsPage;