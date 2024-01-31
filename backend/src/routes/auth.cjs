const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController.cjs");

router.post("/", authController.handleLogin);

module.exports = router;
