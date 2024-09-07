const express = require("express");
const router = express.Router();
const { validationResult } = require("express-validator");
const User = require("../model/User.cjs");
const verifyToken = require("../middleware/verifyToken.cjs");

router.post("/change-phone-number", verifyToken, async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed");
    error.status = 400;
    error.data = { errors: errors.array() };
    return next(error);
  }

  const { phoneNumber } = req.body;
  const user = req.user;

  try {
    if (!user.userPhone) {
      user.userPhone = {};
    }

    user.userPhone = phoneNumber;
    await user.save();

    return res.status(200).json({
      message: "Phone number updated successfully",
      phoneNumber: user.userPhone,
    });
  } catch (error) {
    console.error("Error updating phone number:", error);
    error.status = 500;
    next(error);
  }
});

module.exports = router;
