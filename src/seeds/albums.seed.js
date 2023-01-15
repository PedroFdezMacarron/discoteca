const mongoose = require("mongoose");
const Album= require('../api/models/album.model');


const dotenv = require('dotenv');

dotenv.config();

const DB_URL = process.env.DB_URL;


const albums=[{
    "_id": "63c1646805edd17dd4f5ab0d",
        "title": "A Mi Me Gusta",
        "year": 1993,
        "artist": "los del rio",
        "songs": ["63c148c5b9f57d8a14036cfc","63c15f1e28bfe6f5ee825cfa"],
        "imgCover":"https://upload.wikimedia.org/wikipedia/en/b/ba/A_m%C3%AD_me_gusta.jpg"
    },
    {
        "_id": "63c164ea05edd17dd4f5ab0f",
        "title": "Buena Vista Social Club",
        "year": 1992,
        "artist": "Los Viejitos",
        "songs": [ ]
    }
]



mongoose.set("strictQuery", false);
//Acordaos de cambiar la URL de la BBDD

mongoose.connect( DB_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(async () => {
    const allAlbum = await Album.find();
    if(allAlbum.length > 0) {
        await Album.collection.drop();
        console.log('Album Delete');
    }
}).catch((error) => console.log("error Delete Album", error))
.then(async () => {
    const albumMap = albums.map((album) => new Album(album));
    await Album.insertMany(albumMap);
    console.log("insert Album")
})
.catch((error) => console.log("error insert Album", error))
.finally(() => mongoose.disconnect());







