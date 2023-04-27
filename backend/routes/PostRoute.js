const express = require("express");
const router = express.Router();
const {postTwitter, getPostHistory} = require("../controllers/PostController");

router.get("/twitter", postTwitter);
router.get("/twitter", getPostHistory);

module.exports = router;