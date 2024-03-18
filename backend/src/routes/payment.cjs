const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController.cjs");

router.post("/", paymentController.paymentIntent);

module.exports = router;
