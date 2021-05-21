const express = require("express");
const authController = require("./../controller/authController");
const router = express.Router();

router.get("/status", authController.getLoginStatus);
router.post("/login", authController.googleLogin);

router.post("/logout", authController.logout);

module.exports = router;
