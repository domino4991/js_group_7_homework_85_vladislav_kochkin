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
            if(artists.length === 0) return res.status(404).send({error: 'Исполнителей еще нет'});
            res.send(artists);
        } catch (e) {
            res.status(500).send({error: e});
        }
    });

    router.get('/form', [auth, permit('admin', 'user')], async(req, res) => {
        try {
            const artists = await Artist.find().populate('user', 'username -_id');
            if(artists.length === 0) return res.status(404).send({error: 'Исполнителей нет'});
            return res.send(artists);
        } catch (e) {
            return res.status(500).send(e);
        }
    });

    router.get('/users', [auth, permit('user')], async (req, res) => {
        let artists;
        try {
            const usersArtists = await Artist
                .find()
                .populate({
                path: 'user',
                match: {
                    _id: req.user._id
                },
                select: 'username -_id'
            }).lean();
            artists = usersArtists.filter(item => item.user !== null);
            if(artists.length === 0) return res.status(404).send({error: 'Нет исполнителей'});
            return res.send(artists);
        } catch (e) {
            return res.status(500).send(e);
        }
    });

    router.get('/admin', [auth, permit('admin')], async (req, res) => {
       try {
           const artists = await Artist
               .find()
               .populate('user', 'username -_id');
           if(artists.length === 0) return res.status(404).send({error: 'Исполнителей еще нет'});
           return res.send(artists);
       } catch (e) {
           return res.status(500).send(e);
       }
    });

    router.post('/', [auth, permit('admin', 'user'), upload.single('image')], async (req, res) => {
        const artists = new Artist({
            name: req.body.name,
            image: req.body.image,
            info: req.body.info,
            user: req.user._id
        });
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

    router.delete('/:id', [auth, permit('admin')], async (req, res) => {
        try {
            const artist = await Artist.findById(req.params.id);
            if(!artist) return res.status(404).send({error: 'Исполнитель не найден'});
            await Artist.deleteOne({_id: artist._id});
            return res.send({message: `Исполнитель ${artist.name} удалён`});
        } catch (e) {
            return res.status(500).send(e);
        }
    });

    router.put('/:id/publish', [auth, permit('admin')], async (req, res) => {
        try {
            const artist = await Artist.findOneAndUpdate({_id: req.params.id}, {isPublished: req.body.isPublished});
            if(!artist) return res.status(404).send({error: 'Исполнитель не найден'});
            if(req.body.isPublished) {
                return res.send({message: `Исполнитель ${artist.name} опубликован`});
            } else {
                return res.send({message: `Исполнитель ${artist.name} снят в публикации`});
            }
        } catch (e) {
            return res.status(500).send(e);
        }
    });
    return router;
};

module.exports = createRouter;