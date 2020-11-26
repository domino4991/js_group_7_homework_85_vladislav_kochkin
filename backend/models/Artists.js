const mongoose = require('mongoose');
const Album = require('./Albums');

const Schema = mongoose.Schema;

const ArtistSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    info: {
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
        required: true,
        immutable: true
    }
});

ArtistSchema.pre('deleteOne', async function (next) {
    const id = this._conditions._id;
    const album = await Album.find({artist: id});
    if(!album) return next();
    await Album.deleteMany({artist: id});
    next();
});

const Artist = mongoose.model('Artist', ArtistSchema);

module.exports = Artist;