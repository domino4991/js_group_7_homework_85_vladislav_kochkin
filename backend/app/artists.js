const express = require('express');
const path = require('path');
const multer = require('multer');
const {nanoid} = require('nanoid');
const config = require('../config');
const auth = require('../middleware/auth');
const permit = require('../middleware/permit');
const Artist = require('../models/Artists');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    }
});

const upload = multer({storage});

const router = express.Router();

const createRouter = () => {
    router.get('/', async (req, res) => {
        try {
            const artists = await Artist.find({isPublished: true}).populate('user', 'username -_id');
            res.send(artists);
        } catch (e) {
            res.status(500).send({error: e});
        }
    });

    router.post('/', [auth, permit('admin', 'user'), upload.single('image')], async (req, res) => {
        const artists = new Artist(req.body);
        if(req.file) {
            artists.image = req.file.filename;
        }
        try {
            await artists.save();
            res.send({message: `Исполнитель ${artists.name} будет добавлен после модерации.`});
        } catch (e) {
            res.status(422).send(e);
        }
    });
    return router;
};

module.exports = createRouter;