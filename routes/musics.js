const express = require("express");
const router = express.Router();
const {
    getMusics,
    addMusic,
    getMusic,
    deleteMusic,
    updateMusic
} = require("../controllers/musicsController");

router
    .route('/')
    .get(getMusics)
    .post(addMusic);

router
    .route('/:id')
    .get(getMusic)
    .delete(deleteMusic)
    .put(updateMusic);

module.exports = router;