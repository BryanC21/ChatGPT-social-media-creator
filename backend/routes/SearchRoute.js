const express = require("express");
const router = express.Router();
const { searchName, searchNameAdvanced, searchEverything } = require("../controllers/SearchController");

router.get("/searchName", searchName);
router.get("/searchNameAdvanced", searchNameAdvanced); //name, title(optional), dept_no(optional)
router.get("/searchEverything", searchEverything); //title(optional), dept_no(optional), current(optional), order(optional), col(optional), count, offset

module.exports = router;