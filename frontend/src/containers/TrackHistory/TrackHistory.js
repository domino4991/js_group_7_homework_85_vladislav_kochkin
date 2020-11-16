import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getTracksHistory} from "../../store/actions/tracksActions";
import {push} from 'connected-react-router';
import TrackHistoryItem from "../../components/TrackHistoryItem/TrackHistoryItem";
import './TrackHistory.css';

const TrackHistory = () => {
    const {tracksHistory, error} = useSelector(state => state.tracks);
    const {user} = useSelector(state => state.users);
    const dispatch = useDispatch();

    useEffect(() => {
        if(user) {
            dispatch(getTracksHistory());
        } else {
            dispatch(push('/login'));
        }
    }, [dispatch, user]);


    return (
        <section className="Tracks-history">
            <div className="container">
                <h3 className="Title-page">{user && user.username}, Ваша история прослушанных треков</h3>
                {!error ? <div className="Tracks-history-items">
                    {tracksHistory ? tracksHistory.map(item => <TrackHistoryItem
                        key={item._id}
                        artistName={item.track.album.artist.name}
                        datetime={item.datetime}
                        trackName={item.track.name}
                    />) : <p style={{textAlign: 'center'}}>Вы еще не прослушали ни одного трека</p>}
                </div> : <p style={{textAlign: 'center'}}>{error}</p>}
            </div>
        </section>
    );
};

export default TrackHistory;