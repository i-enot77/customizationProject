const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const User = require("../model/User.cjs");
const verifyToken = require("../middleware/verifyToken.cjs");

// Phone number validation middleware
// const phoneValidation = [
//   body("phoneNumber")
//     .matches(/^\+?([0-9]{10,16})$/, "Invalid phone number format")
//     .withMessage("Invalid phone number format"),
// ];

router.post("/change-phone-number", verifyToken, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { phoneNumber } = req.body;
  const user = req.user;

  try {
    if (!user.userPhone) {
      user.userPhone = {};
    }

    user.userPhone = phoneNumber;
    await user.save();

    return res.status(200).json(user.userPhone);
  } catch (error) {
    console.error("Error updating phone number:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
