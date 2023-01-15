const express = require('express');
const {getAlbums, getAlbum, postAlbums, putAlbums, deleteAlbums} = require('../controllers/album.controller');
const {isAuth} = require('../../middleware/auth');
const router = express.Router();

router.get('/', getAlbums);
router.get('/:id', getAlbum);
router.post('/',[isAuth], postAlbums);
router.put('/:id',[isAuth], putAlbums);
router.delete('/:id',[isAuth], deleteAlbums);

module.exports = router;