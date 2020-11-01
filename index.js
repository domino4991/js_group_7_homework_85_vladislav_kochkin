const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const artists = require('./app/artists');
const albums = require('./app/albums');
const tracks = require('./app/tracks');

const app = express();
const PORT = 8000;

app.use(express.json());
app.use(cors());
app.use(express.static('public'));

const run = async () => {
    await mongoose.connect("mongodb://localhost/musicApp", {useNewUrlParser: true, useUnifiedTopology: true});

    console.log("Connected to MongoDB");

    app.use('/artists', artists());
    app.use('/albums', albums());
    app.use('/tracks', tracks());

    app.listen(PORT, () => {
        console.log(`Server started at http://localhost:${PORT}`);
    });
};

run().catch(console.log);