const express = require("express");
const authController = require("../controller/authController");
const userController = require("../controller/userController");
const router = express.Router();

router.use(authController.verifyJwtToken);

router.get("/", userController.getAllUsers);

//Own profile
router.get(
  "/profile",
  authController.restrictTo("user", "admin", "superAdmin"),
  authController.loggedInUser,
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
  authController.loggedInUser,
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
  authController.loggedInUser,
  userController.reportUser
);

router.patch(
  "/notification/seen",
  authController.restrictTo("user", "admin", "superAdmin"),
  authController.loggedInUser,
  userController.seenNotifications
);

router.get(
  "/notifications",
  authController.restrictTo("user", "admin", "superAdmin"),
  authController.loggedInUser,
  userController.getNotifications
);
module.exports = router;
