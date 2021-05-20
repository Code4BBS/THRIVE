const express = require("express");
const authLogic = require("./../controller/authController");
const router = express.Router();

router.post("/login", authLogic.googleLogin);

router.post("/logout", authLogic.logout);

module.exports = router;
