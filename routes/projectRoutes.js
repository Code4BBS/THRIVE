const express = require("express");
const projectController = require("../controller/projectController");
const authController = require("../controller/authController");

const router = express.Router();

router.use(authController.verifyJwtToken, authController.loggedInUser);

router.get("/", projectController.getAllProjects);

router.get("/myProjects", projectController.getAllProjectsOfAUser);

router.get("/:id", projectController.getProject);

router.post("/", projectController.createProject);

router.patch("/:id", projectController.updateProject);

router.delete("/:id", projectController.deleteProject);

router.get(
  "/blacklisted",
  authController.restrictTo("admin"),
  projectController.getAllBlacklistedProjects
);

router.patch(
  "/blacklist/:id",
  authController.restrictTo("admin"),
  projectController.blacklistProject
);

router.patch(
  "/whitelist/:id",
  authController.restrictTo("admin"),
  projectController.whitelistProject
);

router.patch("/request/:id/join", projectController.requestToJoin);

router.patch("/request/:id/accept", projectController.acceptRequest);

router.patch("/request/:id/reject", projectController.rejectRequest);

module.exports = router;
