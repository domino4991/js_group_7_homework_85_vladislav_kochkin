const router = require('express').Router();
const User = require('../models/User');
const config = require('../config');
const axios = require('axios');
const {nanoid} = require('nanoid');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    }
});

const upload = multer({storage});

router.post('/', upload.single('avatar'), async (req, res) => {
    try {
        const user = new User({
            username: req.body.username,
            password: req.body.password,
            displayName: req.body.displayName
        });
        if(req.file) {
            user.avatar = req.file.filename;
        }
        console.log(user.avatar);
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
        return res.send({
            username: user.username,
            token: user.token,
            role: user.role,
            avatar: user.avatar,
            displayName: user.displayName
        });
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

router.post('/facebookLogin', async (req, res) => {
    // const inputToken = req.body.accessToken;
    const accessToken = config.facebookAccess + '|' + config.facebookSecret;
    const debugToken = `https://graph.facebook.com/debug_token?input_token=${req.body.accessToken}&access_token=${accessToken}`;
    try {
        const response = await axios.get(debugToken);
        if(response.data.data.error) {
            return res.status(401).send({error: 'Facebook token incorrect'});
        }
        if(req.body.id !== response.data.data.user_id) {
            return res.status(401).send({error: 'Wrong user ID'});
        }

        let user = await User.findOne({facebookId: req.body.id});
        if(!user) {
            user = new User({
                username: req.body.email,
                password: nanoid(),
                facebookId: req.body.id,
                displayName: req.body.name,
                avatar: req.body.picture.data.url
            })
        }
        user.genToken();
        await user.save({validateBeforeSave: false});
        return res.send(user);
    } catch (e) {
        console.log(e);
        return res.status(401).send({error: 'Facebook token incorrect'});
    }
});

module.exports = router;