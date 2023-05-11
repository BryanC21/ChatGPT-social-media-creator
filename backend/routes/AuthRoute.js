const express = require("express");
const router = express.Router();
const verify = require("../config/verify");
const {authTwitter, authTwitterCallback} = require("../controllers/AuthController");

router.get("/twitter", verify, authTwitter);
router.get("/twitter/callback", verify, authTwitterCallback);

module.exports = router;