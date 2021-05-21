const express = require("express");
const projectController = require("../controller/projectController");

const router = express.Router();

router.get("/", projectController.getAllProjects);

router.get("/:id", projectController.getProject);

router.post("/", projectController.createProject);

router.put("/:id", projectController.updateProject);

router.delete("/:id", projectController.deleteProject);

router.put("/blacklist/:id", projectController.blacklistProject);

router.put("/whitelist/:id", projectController.whitelistProject);

module.exports = router;
