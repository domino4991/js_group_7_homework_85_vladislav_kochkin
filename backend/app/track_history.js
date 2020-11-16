const router = require('express').Router();
const TrackHistory = require('../models/TrackHistory');
const auth = require('../auth');

router.post('/', auth, async (req, res) => {
    try {
        req.body.user = req.user._id;
        req.body.datetime = new Date().toISOString();
        const trackHistory = new TrackHistory(req.body);
        await trackHistory.save();
        return res.send(trackHistory);
    } catch (e) {
        return res.status(400).send({error: 'Bad request'});
    }
});

router.get('/', auth, async (req, res) => {
    try {
        const trackHistory = await TrackHistory
            .find({user: req.user._id})
            .sort({datetime: -1})
            .populate({
                path: 'track',
                populate: {
                    path: 'album',
                    populate: {
                        path: 'artist'
                    }
                }
            });
        if(!trackHistory || trackHistory.length === 0) return res.status(404).send({error: '404 Not Found'});
        return res.send(trackHistory);
    } catch (e) {
        return res.status(400).send({error: 'Bad request'});
    }
});

module.exports = router;