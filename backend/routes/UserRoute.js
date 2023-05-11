const express = require("express");
const router = express.Router();
const verify = require("../config/verify");
const {getByID, editByID, getCurrentUser} = require("../controllers/UserController");

router.get("/getByID", verify, getByID);
router.get("/getCurrentUser", verify, getCurrentUser);
router.get("/editByID", verify, editByID);

module.exports = router;