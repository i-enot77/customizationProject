const express = require("express");
const router = express.Router();
const refreshTokenController = require("../controllers/refreshTokenController.cjs");

router.get("/", refreshTokenController.handleRefreshToken);

module.exports = router;
