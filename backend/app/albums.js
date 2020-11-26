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
                    .sort({year: 1})
                    .populate('artist')
                    .populate('user', 'username -_id')
                    .lean();
                if(albums.length === 0) return res.status(404).send({error: 'Альбомы данного исполнителя не найдены'});
                for (let item of albums) {
                    const tracks = await Track.find({'album': item._id});
                    item.count = tracks.length;
                }
                return res.send(albums);
            } else {
                albums = await Album.find({isPublished: true}).sort({year: 1}).populate('user', 'username -_id');
            }
            res.send(albums);
        } catch (e) {
            res.status(404).send({error: "404 Not Found"});
        }
    });

    router.get('/form', [auth, permit('admin', 'user')], async (req, res) => {
        try {
            if(req.query.artist) {
                const albums = await Album
                    .find({'artist': req.query.artist})
                    .populate('user', 'username -_id');
                if(albums.length === 0) return res.status(404).send({error: 'Альбомов нет'});
                return res.send(albums);
            } else {
                return res.status(400).send({error: 'Bad Request'});
            }
        } catch (e) {
            return res.status(500).send(e);
        }
    });

    router.get('/users', [auth, permit('user')], async (req, res) => {
        let albums;
        try {
            const usersAlbums = await Album
                .find()
                .populate({
                    path: 'user',
                    match: {
                        _id: req.user._id
                    },
                    select: 'username -_id'
                }).lean();
            albums = usersAlbums.filter(item => item.user !== null);
            if(albums.length === 0) return res.status(404).send({error: 'Нет альбомов'});
            return res.send(albums);
        } catch (e) {
            return res.status(500).send(e);
        }
    });

    router.get('/admin', [auth, permit('admin')], async (req, res) => {
        try {
            const albums = await Album
                .find()
                .sort({year: 1})
                .populate('user', 'username -_id');
            if(albums.length === 0) return res.status(404).send({error: 'Альбомов нет'});
            return res.send(albums);
        } catch (e) {
            return res.status(500).send(e);
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

    router.post('/', [auth, permit('admin', 'user'), upload.single('image')], async (req, res) => {
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

    router.delete('/:id', [auth, permit('admin')], async (req, res) => {
        try {
            const album = await Album.findById(req.params.id);
            if(!album) return res.status(404).send({error: 'Альбом не найден'});
            await Album.deleteOne({_id: album._id});
            return res.send({message: `Альбом ${album.name} удалён`});
        } catch (e) {
            return res.status(500).send(e);
        }
    });

    router.put('/:id/publish', [auth, permit('admin')], async (req, res) => {
        try {
            const album = await Album.findOneAndUpdate({_id: req.params.id}, {isPublished: req.body.isPublished});
            if(!album) return res.status(404).send({error: 'Альбом не найден'});
            if(req.body.isPublished) {
                return res.send({message: `Альбом ${album.name} опубликован`});
            } else {
                return res.send({message: `Альбом ${album.name} снят в публикации`});
            }
        } catch (e) {
            return res.status(500).send(e);
        }
    });

    return router;
};

module.exports = createRouter;