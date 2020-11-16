import React from 'react';
import './TrackHistoryItem.css';
import PropTypes from 'prop-types';
import Moment from "react-moment";

const TrackHistoryItem = ({artistName, trackName, datetime}) => {
    return (
        <div className="Track-history-item">
            <p className="Track-history-item__artist-name Track-history-item__txt">Исполнитель: <span>{artistName}</span></p>
            <p className="Track-history-item__track-name Track-history-item__txt">Композиция: <span>{trackName}</span></p>
            <p className="Track-history-item__datetime Track-history-item__txt">Время прослушивания: <span><Moment format="DD.MM.YYYY HH:mm:ss">{datetime}</Moment></span></p>
        </div>
    );
};

TrackHistoryItem.propTypes = {
    artistName: PropTypes.string.isRequired,
    trackName: PropTypes.string.isRequired,
    datetime: PropTypes.string.isRequired
};

export default TrackHistoryItem;