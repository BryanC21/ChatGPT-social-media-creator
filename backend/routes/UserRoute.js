const express = require("express");
const router = express.Router();
const {getByID, editByID} = require("../controllers/UserController");

router.get("/getByID", getByID);
router.get("/editByID", editByID);

module.exports = router;