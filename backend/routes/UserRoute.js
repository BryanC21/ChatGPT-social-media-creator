const express = require("express");
const router = express.Router();
const {getEmployeeCount, getByID, getByDepartment, getDepartments, editByID, getDepartmentsManagers, getByDepartmentCurrent, getTitles} = require("../controllers/UserController");

router.get("/getEmployeeCount", getEmployeeCount);
router.get("/getByID", getByID);
router.get("/getByDepartment", getByDepartment);
router.get("/getDepartments", getDepartments);
router.get("/getTitles", getTitles);
router.get("/getDepartmentsManagers", getDepartmentsManagers);
router.get("/editByID", editByID);
router.get("/getByDepartmentCurrent", getByDepartmentCurrent);

module.exports = router;