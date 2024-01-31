const express = require("express");
const router = express.Router();
const sendContactForm = require("../controllers/contactFormController.cjs");

router.post("/", sendContactForm.sendContactForm);

module.exports = router;
