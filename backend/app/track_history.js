const router = require('express').Router();
const TrackHistory = require('../models/TrackHistory');
const User = require('../models/User');

router.post('/', async (req, res) => {
    const token = req.get('Authorization');
    if(!token) return res.status(401).send({error: 'No token present'});
    try {
        const user = await User.findOne({token});
        if(!user) return res.status(401).send({error: 'Wrong token!'});
        req.body.user = user._id;
        const trackHistory = new TrackHistory(req.body);
        await trackHistory.save();
        return res.send(trackHistory);
    } catch (e) {
        return res.status(400).send({error: 'Bad request'});
    }
});

module.exports = router;