const mongoose = require("mongoose");
const Song= require('../api/models/song.model');

const dotenv = require('dotenv');

dotenv.config();

const DB_URL = process.env.DB_URL;

const audios=[
    {
        "_id": "63c148c5b9f57d8a14036cfc",
        "title": "la macarena",
        "year": 1993,
        "artist": "los del rio",
        "style": "pop"
    },
    {
        "_id": "63c15f1e28bfe6f5ee825cfa",
        "title": "Mi gitana",
        "artist": "los del rio",
        "style": "pop",
        "year": 2008,
        "__v": 0
    }
];

mongoose.set("strictQuery", false);


mongoose.connect( DB_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(async () => {
    const allAudio = await Song.find();
    if(allAudio.length > 0) {
        await Song.collection.drop();
        console.log('Song Delete');
    }
}).catch((error) => console.log("error Delete audios", error))
.then(async () => {
    const songMap = audios.map((audio) => new Song(audio));
    await Song.insertMany(songMap);
    console.log("insert audios")
})
.catch((error) => console.log("error insert audios", error))
.finally(() => mongoose.disconnect());
