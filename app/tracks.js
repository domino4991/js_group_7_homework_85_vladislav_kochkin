const express = require('express');
const Track = require('../models/Track');

const router = express.Router();

const createRouter = () => {
    router.get('/', async (req, res) => {
        let tracks;
        try {
            if(req.query.album) {
                tracks = await Track.find({"album": req.query.album}).populate({path: 'album', populate: {path: 'artist'}});
            } else {
                tracks = await Track.find().populate({path: 'album', populate: {path: 'artist'}});
            }
            res.send(tracks);
        } catch (e) {
            res.status(500).send(e);
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