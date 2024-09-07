const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const User = require("../model/User.cjs");

// Setup for mail transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

router.post("/reset-email", async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email }).exec();
    if (!user) {
      throw { status: 404, message: "User not found" };
    }

    // Generate JWT token with user email as payload
    const resetToken = jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1h",
    });

    // Construct password reset link
    const resetLink = `http://localhost:5173/reset-password/${resetToken}`;

    const mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: email,
      subject: "Password Reset Request",
      text: `Click the following link to reset your password: ${resetLink}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email", error);
        error.status = 500;
        error.message = "Error sending email";
        return next(error);
      }

      console.log("Email sent: " + info.response);
      res.json({ message: "Password reset link sent to your email" });
    });
  } catch (error) {
    console.error("Password reset request failed", error);
    next(error);
  }
});

module.exports = router;
