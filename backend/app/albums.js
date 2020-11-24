const express = require('express');
const path = require('path');
const multer = require('multer');
const {nanoid} = require('nanoid');
const config = require('../config');
const auth = require('../middleware/auth');
const permit = require('../middleware/permit');
const Album = require('../models/Albums');
const Track = require('../models/Track');

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
        let albums;
        try {
            if(req.query.artist) {
                albums = await Album
                    .find({"artist": req.query.artist, isPublished: true})
                    .populate('artist')
                    .populate('user', 'username -_id')
                    .sort({year: 1})
                    .lean();
                if(albums.length === 0) return res.status(404).send({error: 'Альбомы данного исполнителя не найдены'});
                for (let item of albums) {
                    const tracks = await Track.find({'album': item._id});
                    item.count = tracks.length;
                }
                return res.send(albums);
            } else {
                albums = await Album.find({isPublished: true}).sort({year: 1});
            }
            res.send(albums);
        } catch (e) {
            res.status(404).send({error: "404 Not Found"});
        }
    });

    router.get('/:id', async (req, res) => {
        try {
            const albums = await Album
                .find({_id: req.params.id, isPublished: true})

                .populate('artist');
            res.send(albums);
        } catch (e) {
            res.status(404).send('404 not found');
        }
    });

    router.post('/', [auth, permit('admin'), upload.single('image')], async (req, res) => {
        const albums = new Album({
            name: req.body.name,
            year: req.body.year,
            image: req.body.image,
            user: req.user._id,
            artist: req.body.artist
        });
        if(req.file) {
            albums.image = req.file.filename;
        }
        try {
            await albums.save();
            res.send({message: `Альбом ${albums.name} будет добавлен после модерации`});
        } catch (e) {
            res.status(422).send(e);
        }
    });
    return router;
};

module.exports = createRouter;