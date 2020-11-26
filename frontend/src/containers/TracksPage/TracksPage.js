import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getTracks} from "../../store/actions/tracksActions";
import TrackItem from "../../components/TrackItem/TrackItem";
import './TracksPage.css';
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const TracksPage = props => {
    const {tracks, tracksError} = useSelector(state => state.tracks);
    const dispatch = useDispatch();
    const query = props.location.search;

    useEffect(() => {
        dispatch(getTracks(query));
    }, [dispatch, query]);

    return (
        <section className="Tracks-page">
            <div className="container">
                <h2 className="Tracks-page__title">Треки</h2>
                {!tracksError ? tracks &&
                    <TrackItem
                        tracks={tracks}
                    /> : <p style={{textAlign: 'center'}}>{tracksError}</p>
                }
                <ToastContainer autoClose={2000} />
            </div>
        </section>
    );
};

export default TracksPage;