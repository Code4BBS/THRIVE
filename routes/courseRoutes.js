const express = require("express");
const authController = require("../controller/authController");
const userController = require("../controller/userController");
const courseController = require("../controller/courseController");
const fileController = require("../controller/fileController");
const router = express.Router();

router.use(authController.verifyJwtToken, authController.loggedInUser);

router.get(
  "/",
  authController.restrictTo("admin"),
  courseController.getAllCourses
);

router.post(
  "/my-courses",
  authController.restrictTo("admin"),
  courseController.getMyCourses
);

router.get(
  "/:id",
  authController.restrictTo("admin"),
  courseController.getCourse
);

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

router.post(
  "/assignment",
  fileController.uploadFile,
  courseController.createAssignment
);
router.get("/assignments/:id", courseController.getAllAssignmentsOfCourse);
router.get("/assignment/:id", courseController.getAssignment);
router.get("/assignment/open/:filename", fileController.getFile);

module.exports = router;
