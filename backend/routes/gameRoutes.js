const express = require("express");
const { fetchGames } = require("../controllers/gameController");

const router = express.Router();

router.get("/", fetchGames);

module.exports = router;
