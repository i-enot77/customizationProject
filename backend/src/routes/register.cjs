const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../model/User.cjs");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  const {
    // username,
    email,
    password,
    // country,
    // firstName,
    // lastName,
    // address,
    // zipCode,
    // city,
    // phone,
  } = req.body;

  if (!email || !password)
    return res
      .status(400)
      .json({ message: "All required fields must be provided." });

  const duplicate = await User.findOne({ email }).exec();
  if (duplicate)
    return res
      .status(409)
      .json({ message: "Uzytkownik pod tym adresem email już istnieje" });

  try {
    const hashedPwd = await bcrypt.hash(password, 10);

    const userId = new mongoose.Types.ObjectId();
    const newUser = new User({
      _id: userId,
      // username,
      email,
      password: hashedPwd,
      // address: {
      //   country,
      //   firstName,
      //   lastName,
      //   address,
      //   zipCode,
      //   city,
      //   phone,
      // },
      created_at: new Date(),
    });
    await newUser.save();

    const accessToken = jwt.sign(
      { UserInfo: { id: newUser._id } },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
      { id: newUser._id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" } //
    );

    newUser.refreshToken = refreshToken;
    await newUser.save();

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "None",
      maxAge: 60 * 60 * 1000,
    });

    return res.json({
      success: `New user created and logged in!`,
      userData: {
        id: newUser._id,
        email: newUser.email,
        // country: newUser.address.country,
        // firstName: newUser.address.firstName,
        // lastName: newUser.address.lastName,
        // address: newUser.address.address,
        // zipCode: newUser.address.zipCode,
        // city: newUser.address.city,
        // phone: newUser.address.phone,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
