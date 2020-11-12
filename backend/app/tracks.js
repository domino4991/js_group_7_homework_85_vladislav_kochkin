const express = require('express');
const Track = require('../models/Track');

const router = express.Router();

const createRouter = () => {
    router.get('/', async (req, res) => {
        let tracks;
        try {
            if(req.query.album) {
                tracks = await Track
                    .find({"album": req.query.album})
                    .sort({trackNumber: 1})
                    .populate({path: 'album', populate: {path: 'artist'}});
            } else if(req.query.artist) {
                const tracksArtist = await Track
                    .find()
                    .sort({trackNumber: 1})
                    .populate({
                    path: 'album',
                    match: {
                        'artist': req.query.artist
                    },
                    populate: {
                        path: 'artist'
                    }
                });
                tracks = tracksArtist.filter(item => item.album !== null);
            } else {
                tracks = await Track
                    .find()
                    .sort({trackNumber: 1})
                    .populate({path: 'album', populate: {path: 'artist'}});
            }
            res.send(tracks);
        } catch (e) {
            res.status(404).send({error: "404 Not Found"});
        }
    });
    router.post('/', async (req, res) => {
        const track = new Track(req.body);
        try {
            await track.save();
            res.send(track);
        } catch (e) {
            res.status(400).send(e);
        }
    });

    return router;
};

module.exports = createRouter;