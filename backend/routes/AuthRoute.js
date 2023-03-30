const express = require("express");
const router = express.Router();
const {authTwitter, authTwitterCallback} = require("../controllers/AuthController");

router.get("/twitter", authTwitter);
router.get("/twitter/callback", authTwitterCallback);

module.exports = router;