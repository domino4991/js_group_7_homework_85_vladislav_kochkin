const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TrackSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    album: {
        type: Schema.Types.ObjectId,
        ref: 'Album',
        required: true
    },
    duration: {
        type: String,
        default: null
    },
    trackNumber: {
        type: Number,
        required: true
    },
    audioFile: {
        type: String,
        default: null
    },
    isPublished: {
        type: Boolean,
        default: false,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const Track = mongoose.model('Track', TrackSchema);

module.exports = Track;