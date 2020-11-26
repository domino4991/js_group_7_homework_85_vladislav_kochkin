const mongoose = require('mongoose');
const TrackHistory = require('./TrackHistory');

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

TrackSchema.pre('deleteOne', async function (next) {
    const id = this._conditions._id;
    const trackHistory = await TrackHistory.find({track: id});
    if(!trackHistory) return next();
    await TrackHistory.deleteMany({track: id});
    next();
});

TrackSchema.pre('deleteMany', async function (next) {
    if(this._conditions.album) {
        const id = this._conditions.album;
        const tracks = await Track.find({album: id});
        for (const trackItem of tracks) {
            const tracksHistory = await TrackHistory.find({track: trackItem});
            if(!tracksHistory) return next();
            await TrackHistory.deleteMany({track: trackItem._id});
        }
    }
    next();
});

const Track = mongoose.model('Track', TrackSchema);

module.exports = Track;