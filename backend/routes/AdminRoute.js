const express = require("express");
const router = express.Router();
const {getPostHistoryByUserId} = require("../controllers/AdminController");

router.get("/getPostHistoryByUserId", getPostHistoryByUserId);

module.exports = router;