const express = require("express");
const router = express.Router();
const verify = require("../config/verify");
const {getByID, editByID} = require("../controllers/UserController");

router.get("/getByID", verify, getByID);
router.get("/editByID", verify, editByID);

module.exports = router;