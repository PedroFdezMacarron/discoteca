const express = require('express');
const {getSongs, postSongs, putSongs, deleteSongs} = require('../controllers/song.controller');
const {isAuth} = require('../../middleware/auth');
const {isAdmin} = require('../../middleware/auth');
const router = express.Router();

router.get('/', getSongs);
// router.post('/',[isAuth], postSongs);
router.post('/', postSongs);
router.put('/:id',[isAdmin], putSongs);
router.delete('/:id',[isAdmin], deleteSongs);

module.exports = router;