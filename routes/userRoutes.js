const express = require("express");
const authController = require("../controller/authController");
const userController = require("../controller/userController");
const router = express.Router();

router.use(authController.verifyJwtToken, authController.loggedInUser);

router.get("/", userController.getAllUsers);
router.get(
  "/teacher",
  authController.restrictTo("admin"),
  userController.getAllTeachers
);
// router.get("/teachers", userController.getAllUTeachers);
//Own profile
router.get(
  "/profile",
  authController.restrictTo("user", "admin", "collegeAdmin", "Teacher"),
  userController.aboutMe
);

//Other's profile
router.get(
  "/other",
  authController.restrictTo("visitor", "user", "admin", "superAdmin"),
  userController.getProfile
);

router.patch(
  "/profile",
  authController.restrictTo("user", "admin", "superAdmin"),
  userController.updateProfile
);

router.get(
  "/tag",
  authController.restrictTo("visitor", "user", "admin", "superAdmin"),
  userController.getAllTags
);

router.patch(
  "/report/:id",
  authController.restrictTo("user", "admin", "superAdmin"),
  userController.reportUser
);
router.get(
  "/notifications",
  authController.restrictTo("user", "admin", "Teacher"),
  userController.getNotifications
);

router.patch(
  "/endorse/:id",
  authController.restrictTo("user", "admin"),
  userController.endorseUser
);

router.patch(
  "/clearEndorses",
  authController.restrictTo("admin"),
  userController.clearReports
);

module.exports = router;
