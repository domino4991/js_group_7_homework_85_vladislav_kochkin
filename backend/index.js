const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const artists = require('./app/artists');
const albums = require('./app/albums');
const tracks = require('./app/tracks');
const users = require('./app/users');
const trackHistory = require('./app/track_history');
const config = require('./config');

const app = express();
let PORT = process.env.NODE_ENV === 'test' ? 8010 : 8000;

app.use(express.json());
app.use(cors());
app.use(express.static('public'));

const run = async () => {
    await mongoose.connect(config.database, config.databaseOpt);

    console.log("Connected to MongoDB");

    app.use('/artists', artists());
    app.use('/albums', albums());
    app.use('/tracks', tracks());
    app.use('/users', users);
    app.use('/track_history', trackHistory);
    app.use((req, res) => {
        res.status(404).send({"error": "404 Not found"});
    });

    app.listen(PORT, () => {
        console.log(`Server started at http://localhost:${PORT}`);
    });
};

run().catch(console.log);