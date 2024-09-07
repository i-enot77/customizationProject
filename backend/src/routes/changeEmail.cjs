const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const User = require("../model/User.cjs");
const verifyToken = require("../middleware/verifyToken.cjs");
const emailUpdateValidation = require("../middleware/emailUpdateValidation.cjs");

router.post(
  "/change-email",
  verifyToken,
  emailUpdateValidation,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Validation failed");
      error.status = 400;
      error.data = { errors: errors.array() };
      return next(error);
    }

    const { newEmail } = req.body;
    const user = req.user;

    try {
      user.email = newEmail;
      user.refreshToken = "";
      await user.save();

      res.clearCookie("jwt");

      return res.status(200).json({
        message: "Email updated successfully",
      });
    } catch (error) {
      console.error("Error updating email:", error);
      error.status = 500;
      return next(error);
    }
  }
);

module.exports = router;
