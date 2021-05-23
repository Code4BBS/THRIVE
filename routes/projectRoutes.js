const express = require("express");
const projectController = require("../controller/projectController");
const authController = require("../controller/authController");

const router = express.Router();

router.use(authController.verifyJwtToken, authController.loggedInUser);

router.get("/", projectController.getAllProjects);

router.get("/:id", projectController.getProject);

router.post("/", projectController.createProject);

router.put("/:id", projectController.updateProject);

router.delete("/:id", projectController.deleteProject);

router.get(
  "/blacklisted",
  authController.restrictTo("admin"),
  projectController.getAllBlacklistedProjects
);

router.put(
  "/blacklist/:id",
  authController.restrictTo("admin"),
  projectController.blacklistProject
);

router.put(
  "/whitelist/:id",
  authController.restrictTo("admin"),
  projectController.whitelistProject
);

module.exports = router;
