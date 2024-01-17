const express = require("express");
const router = express.Router();
const resetPasswordController = require("../controllers/resetPasswordController.cjs");

router.post("/", resetPasswordController.resetPwdToken);

module.exports = router;
