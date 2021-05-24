const express = require("express");
const authController = require("../controller/authController");
const userController = require("../controller/userController");
const courseController = require("../controller/courseController");
const router = express.Router();

router.use(authController.verifyJwtToken, authController.loggedInUser);

router.post(
  "/",
  authController.restrictTo("admin"),
  courseController.createCourse
);

router.post(
  "/enroll/:id",
  // authController.restrictTo("Teacher"),
  courseController.enrollStudents
);
module.exports = router;
