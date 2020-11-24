const mongoose = require('mongoose');

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

const Album = mongoose.model('Album', AlbumSchema);

module.exports = Album;