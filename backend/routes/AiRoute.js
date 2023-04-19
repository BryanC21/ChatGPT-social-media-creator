const express = require("express");
const router = express.Router();
const {summarize, createTweet} = require("../controllers/AiController");

router.get("/summarize", summarize);
router.get("/createTweet", createTweet);

module.exports = router;