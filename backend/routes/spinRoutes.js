const express = require("express");
const { spin } = require("../controllers/spinController");

const router = express.Router();

router.post("/", spin);

module.exports = router;
