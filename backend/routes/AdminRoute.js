const express = require("express");
const router = express.Router();
const verify = require("../config/verify");
const {getPostHistoryByUserId} = require("../controllers/AdminController");

router.get("/getPostHistoryByUserId", verify, getPostHistoryByUserId);

module.exports = router;