const express = require("express");
const authController = require("../controller/authController");
const adminController = require("../controller/adminController");
const router = express.Router();

router.use(
  authController.verifyJwtToken,
  authController.loggedInUser,
  authController.restrictTo("admin")
);

router.patch("/teacher", adminController.assignRoleToTeachers);

module.exports = router;
