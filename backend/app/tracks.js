const express = require('express');
const Track = require('../models/Track');
const path = require('path');
const multer = require('multer');
const {nanoid} = require('nanoid');
const config = require('../config');
const auth = require('../middleware/auth');
const permit = require('../middleware/permit');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.audioUploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    }
});

const upload = multer({storage});

const router = express.Router();

const createRouter = () => {
    router.get('/', async (req, res) => {
        let tracks;
        try {
            if(req.query.album) {
                tracks = await Track
                    .find({"album": req.query.album, isPublished: true})
                    .sort({trackNumber: 1})
                    .populate({
                        path: 'album',
                        populate: {path: 'artist'}
                    })
                    .populate('user', 'username -_id');
                if(tracks.length === 0) return res.status(404).send({error: 'В данный альбом не было добавлено ни одного трека'});
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
                if(tracksArtist.length === 0) return res.status(404).send({error: 'Треков по данному исполнителю не найдено'});
            } else {
                tracks = await Track
                    .find()
                    .sort({trackNumber: 1})
                    .populate({path: 'album', populate: {path: 'artist'}});
                if(tracks.length === 0) return res.status(404).send({error: 'Не было добавленно ни одного трека'});
            }
            res.send(tracks);
        } catch (e) {
            res.status(404).send({error: "404 Not Found"});
        }
    });

    router.get('/users', [auth, permit('user')], async (req, res) => {
        let tracks;
        try {
            const usersTracks = await Track
                .find()
                .populate({
                    path: 'user',
                    match: {
                        _id: req.user._id
                    },
                    select: 'username -_id'
                }).lean();
            tracks = usersTracks.filter(item => item.user !== null);
            if(tracks.length === 0) return res.status(404).send({error: 'Нет треков'});
            return res.send(tracks);
        } catch (e) {
            return res.status(500).send(e);
        }
    });

    router.get('/admin', [auth, permit('admin')], async (req, res) => {
        try {
            const tracks = await Track.find().populate('user', 'username -_id');
            if(tracks.length === 0) return res.status(404).send({error: 'Треков нет'});
            return res.send(tracks);
        } catch (e) {
            return res.status(500).send(e);
        }
    });

    router.post('/', [auth, permit('admin', 'user'), upload.single('audioFile')], async (req, res) => {
        const track = new Track({
            name: req.body.name,
            duration: req.body.duration,
            trackNumber: Number(req.body.trackNumber),
            album: req.body.album,
            user: req.user._id
        });
        if(req.file) {
            track.audioFile = req.file.filename;
        }
        try {
            await track.save();
            res.send({message: `Трек ${track.name} будет добавлен после модерации.`});
        } catch (e) {
            res.status(400).send({error: 'Bad Request'})
        }
    });

    router.delete('/:id', [auth, permit('admin')], async (req, res) => {
        try {
            const track = await Track.findById(req.params.id);
            if(!track) return res.status(404).send({error: 'Трек не найден'});
            await Track.deleteOne({_id: track._id});
            return res.send({message: `Трек ${track.name} удалён`});
        } catch (e) {
            return res.status(500).send(e);
        }
    });

    router.put('/:id/publish', [auth, permit('admin')], async (req, res) => {
        try {
            const track = await Track.findOneAndUpdate({_id: req.params.id}, req.body);
            if(!track) return res.status(404).send({error: 'Трек не найден'});
            if(req.body.isPublished) {
                return res.send({message: `Трек ${track.name} опубликован`});
            } else {
                return res.send({message: `Трек ${track.name} снят в публикации`});
            }
        } catch (e) {
            return res.status(500).send(e);
        }
    });

    return router;
};

module.exports = createRouter;