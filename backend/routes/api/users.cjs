const express = require("express");
const router = express.Router();
const usersController = require("../../controllers/usersController.cjs");

router.route("/").get(usersController.getAllUsers);

module.exports = router;
