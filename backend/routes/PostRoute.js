const express = require("express");
const router = express.Router();
const verify = require("../config/verify");
const {postTwitter, getPostHistory} = require("../controllers/PostController");

router.get("/twitter", verify, postTwitter);
router.get("/getPostHistory", verify, getPostHistory);

module.exports = router;