const router = require('express').Router();
const User = require('../models/User');

router.post('/', async (req, res) => {
    try {
        const user = new User({
            username: req.body.username,
            password: req.body.password
        });
        user.genToken();
        await user.save();
        return res.send(user);
    } catch (e) {
        return res.status(400).send(e);
    }
});

router.post('/sessions', async (req, res) => {
    try {
        const user = await User.findOne({username: req.body.username});
        if(!user) return res.status(404).send({error: 'Username not found'});
        const isMatch = await user.checkPass(req.body.password);
        if(!isMatch) return res.status(400).send({error: 'Password is wrong'});
        user.genToken();
        await user.save({validateBeforeSave: false});
        return res.send({username: user.username, token: user.token, role: user.role});
    } catch (e) {
        return res.status(400).send({error: 'Bad Request'});
    }
});

router.delete('/sessions', async (req, res) => {
    const token = req.get('Authorization');
    try {
        const success = {message: 'Success'};
        if (!token) return res.send(success);
        const user = await User.findOne({token});
        if (!user) return res.send(success);
        user.genToken();
        await user.save({validateBeforeSave: false});
        return res.send(success);
    } catch (e) {
        return res.send(e);
    }
});

module.exports = router;