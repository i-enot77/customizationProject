const express = require("express");
const router = express.Router();
const sendResetEmail = require("../controllers/sendResetEmailController.cjs");

router.post("/", sendResetEmail.sendResetEmail);

module.exports = router;
