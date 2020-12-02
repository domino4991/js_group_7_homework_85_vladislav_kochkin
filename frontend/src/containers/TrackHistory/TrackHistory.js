import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getTracksHistory} from "../../store/actions/tracksActions";
import {push} from 'connected-react-router';
import TrackHistoryItem from "../../components/TrackHistoryItem/TrackHistoryItem";
import './TrackHistory.css';

const TrackHistory = () => {
    const {tracksHistory, tracksError} = useSelector(state => state.tracks);
    const {user} = useSelector(state => state.users);
    const dispatch = useDispatch();
    const tracksHistoryItemsClasses = ['Tracks-history-items'];

    useEffect(() => {
        if(user) {
            dispatch(getTracksHistory());
        } else {
            dispatch(push('/login'));
        }
    }, [dispatch, user]);

    if(tracksHistory && tracksHistory.length < 3) {
        tracksHistoryItemsClasses.push('Tracks-history-flex-start');
    }

    return (
        <section className="Tracks-history">
            <div className="container">
                <h3 className="Title-page">{user && user.displayName}, Ваша история прослушанных треков</h3>
                {!tracksError ? <div className={tracksHistoryItemsClasses.join(' ')}>
                    {tracksHistory && tracksHistory.map(item => <TrackHistoryItem
                        key={item._id}
                        artistName={item.track.album.artist.name}
                        datetime={item.datetime}
                        trackName={item.track.name}
                    />)}
                </div> : <p style={{textAlign: 'center'}}>{tracksError !== '404 Not Found' ? tracksError : 'Вы еще не прослушали ни одного трека'}</p>}
            </div>
        </section>
    );
};

export default TrackHistory;