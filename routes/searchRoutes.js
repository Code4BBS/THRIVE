const express = require("express");
const searchController = require("./../controller/searchController");
const authController = require("../controller/authController");
const router = express.Router();

router
  .route("/user/:query")
  .get(authController.verifyJwtToken, searchController.searchUser);

router
  .route("/tags")
  .post(authController.verifyJwtToken, searchController.searchByTag);

module.exports = router;
