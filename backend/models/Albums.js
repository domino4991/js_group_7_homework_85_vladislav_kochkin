const mongoose = require('mongoose');
const Track = require('./Track');

const Schema = mongoose.Schema;

const AlbumSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    artist: {
        type: Schema.Types.ObjectId,
        ref: "Artist",
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    isPublished: {
        type: Boolean,
        default: false,
        required: true
    }
});

AlbumSchema.pre('deleteMany', async function (next) {
    if(this._conditions.artist) {
        const id = this._conditions.artist;
        const albums = await Album.find({artist: id});
        for (const albumItem of albums) {
            const tracks = await Track.find({album: albumItem});
            if(!tracks) return next();
            await Track.deleteMany({album: albumItem._id});
        }
    }
    next();
});

AlbumSchema.pre('deleteOne', async function (next) {
    const id = this._conditions._id;
    const tracks = await Track.find({album: id});
    if(!tracks) return next();
    await Track.deleteMany({album: id});
    next();
});

const Album = mongoose.model('Album', AlbumSchema);

module.exports = Album;