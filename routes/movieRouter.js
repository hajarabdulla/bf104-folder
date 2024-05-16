const express = require("express");
const moviesController = require("../controller/moviesController");
const authenticateToken = require("../middleware/authenticateToken");

const router = express.Router();

router.get("/movies", authenticateToken, moviesController.getMovies);

module.exports = router;
