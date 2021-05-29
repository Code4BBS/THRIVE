const express = require("express");
const authController = require("../controller/authController");
const userController = require("../controller/userController");
const courseController = require("../controller/courseController");
const fileController = require("../controller/fileController");
const router = express.Router();

router.use(authController.verifyJwtToken, authController.loggedInUser);

router.get(
  "/",
  authController.restrictTo("collegeAdmin"),
  courseController.getAllCourses
);
router.get("/deadline", courseController.getAssignmentsByDeadline);

router.post("/my-courses", courseController.getMyCourses);

router.get(
  "/:id",
  authController.restrictTo("user", "Teacher", "admin"),
  courseController.getCourse
);
router.get("/students/:id", courseController.getStudentsOfCourse);

router.post(
  "/",
  authController.restrictTo("collegeAdmin"),
  courseController.createCourse
);

router.post(
  "/enroll/:id",
  authController.restrictTo("Teacher"),
  courseController.enrollStudents
);

router.post(
  "/assignment",
  authController.restrictTo("Teacher"),
  fileController.uploadFile,
  courseController.createAssignment
);
router.post(
  "/submit/assignment/:id",
  authController.restrictTo("user", "admin"),
  fileController.uploadFile,
  courseController.submitAssignment
);

router.get("/assignments/:id", courseController.getAllAssignmentsOfCourse);
router.get("/assignment/:id", courseController.getAssignment);
router.get("/assignment/open/:filename", fileController.getFile);

router.get("/chat-room/:id", courseController.getAllChatMessagesByCourse);

module.exports = router;
