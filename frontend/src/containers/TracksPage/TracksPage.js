import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getTracks} from "../../store/actions/tracksActions";
import TrackItem from "../../components/TrackItem/TrackItem";
import './TracksPage.css';

const TracksPage = props => {
    const {tracks} = useSelector(state => state.tracks);
    const dispatch = useDispatch();
    const query = props.location.search;

    useEffect(() => {
        dispatch(getTracks(query));
    }, [dispatch, query]);

    return (
        <section className="Tracks-page">
            <div className="container">
                <h2 className="Tracks-page__title">Треки</h2>
                {tracks &&
                    <TrackItem
                        tracks={tracks}
                    />
                }
            </div>
        </section>
    );
};

export default TracksPage;