const express = require("express");
const router = express.Router();
const {postTwitter} = require("../controllers/PostController");

router.get("/twitter", postTwitter);

module.exports = router;