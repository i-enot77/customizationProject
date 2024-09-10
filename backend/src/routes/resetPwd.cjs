const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../model/User.cjs");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

router.post("/reset-password", async (req, res, next) => {
  const { token, newPassword } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findOne({ username: decoded.username }).exec();

    if (!user) {
      throw { status: 404, message: "User not found" };
    }

    const hashedPwd = await bcrypt.hash(newPassword, 10);
    user.password = hashedPwd;
    await user.save();

    // Send a confirmation email
    const mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: user.email, // User's email
      subject: "Your Password Has Been Reset",
      text: "Your password has been successfully reset. If you did not initiate this change, please contact support immediately.",
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.error("Email sending failed:", error);
        return res
          .status(500)
          .json({ message: "Failed to send confirmation email" });
      }
      console.log("Confirmation email sent: " + info.response);
      res.json({
        message: "Password reset successfully and confirmation email sent",
      });
    });
  } catch (error) {
    console.error("Password reset failed", error);
    if (error instanceof jwt.JsonWebTokenError) {
      error.status = 400;
      error.message = "Invalid or expired token";
    }
    next(error);
  }
});

module.exports = router;

// const express = require("express");
// const router = express.Router();
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");
// const User = require("../model/User.cjs");

// router.post("/reset-password", async (req, res, next) => {
//   const { token, newPassword } = req.body;

//   try {
//     const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
//     const user = await User.findOne({ username: decoded.username }).exec();

//     if (!user) {
//       throw { status: 404, message: "User not found" };
//     }

//     const hashedPwd = await bcrypt.hash(newPassword, 10);
//     user.password = hashedPwd;
//     await user.save();

//     res.json({ message: "Password reset successfully" });
//   } catch (error) {
//     console.error("Password reset failed", error);
//     if (error instanceof jwt.JsonWebTokenError) {
//       error.status = 400; // Specific status for JWT errors
//       error.message = "Invalid or expired token";
//     }
//     next(error);
//   }
// });

// module.exports = router;
