const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TrackHistorySchema = new Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    track: {
        type: mongoose.Types.ObjectId,
        ref: 'Track',
        required: true
    },
    datetime: {
        type: String,
        default: new Date().toISOString()
    }
});

const TrackHistory = mongoose.model('TrackHistory', TrackHistorySchema);

module.exports = TrackHistory;