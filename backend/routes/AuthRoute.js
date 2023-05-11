const express = require("express");
const router = express.Router();
const verify = require("../config/verify");
const {authTwitter, authTwitterCallback, checkTwitter} = require("../controllers/AuthController");

router.get("/twitter", verify, authTwitter);
router.get("/twitter/callback", verify, authTwitterCallback);
router.get("/checkTwitter", verify, checkTwitter);

module.exports = router;