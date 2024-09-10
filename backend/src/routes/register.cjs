const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../model/User.cjs");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

router.post("/register", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw { status: 400, message: "All required fields must be provided." };
    }

    const duplicate = await User.findOne({ email });
    if (duplicate) {
      throw {
        status: 409,
        message: "Uzytkownik pod tym adresem email już istnieje.",
      };
    }

    const hashedPwd = await bcrypt.hash(password, 10);
    const newUser = new User({
      _id: new mongoose.Types.ObjectId(),
      email,
      password: hashedPwd,
      created_at: new Date(),
    });

    await newUser.save();

    const refreshToken = jwt.sign(
      { id: newUser._id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );
    newUser.refreshToken = refreshToken;
    await newUser.save();

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "None",
      maxAge: 60 * 60 * 1000,
    });

    // Send confirmation email
    const mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: newUser.email,
      subject: "Account Creation Success",
      text: `Witamy w gronie naszych użytkowników! Twoje konto zostało pomyślnie stworzone.`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.error("Email sending failed:", error);
        error.status = 500;
        return next(error);
      }
      console.log("Email sent: " + info.response);
      return res.json({
        success: `New user created, logged in, and email sent!`,
        userData: {
          id: newUser._id,
          email: newUser.email,
        },
      });
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
