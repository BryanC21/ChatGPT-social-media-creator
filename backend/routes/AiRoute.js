const express = require("express");
const router = express.Router();
const verify = require("../config/verify");
const {summarize, createTweet} = require("../controllers/AiController");

router.get("/summarize", verify, summarize);
router.get("/createTweet", verify, createTweet);

module.exports = router;