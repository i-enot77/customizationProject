const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const User = require("../model/User.cjs");

const validateLoginInput = [
  body("userEmail").notEmpty().withMessage("Email is required"),
  body("pwd").notEmpty().withMessage("Password is required"),
];

const generateRefreshToken = (user, persist) => {
  return jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: persist ? "7d" : "1h",
  });
};

router.post("/auth", async (req, res) => {
  try {
    await Promise.all(
      validateLoginInput.map((validation) => validation.run(req))
    );
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { userEmail, pwd, persist } = req.body;
    const foundUser = await User.findOne({ email: userEmail }).exec();
    if (!foundUser) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const match = await bcrypt.compare(pwd, foundUser.password);
    if (!match) {
      return res.sendStatus(401);
    }

    const accessToken = jwt.sign(
      { id: foundUser._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );

    const refreshToken = generateRefreshToken(foundUser, persist);
    foundUser.refreshToken = refreshToken;
    await foundUser.save();

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Secure only in production
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
      maxAge: persist ? 7 * 24 * 60 * 60 * 1000 : 60 * 60 * 1000,
    });

    const response = {
      userData: {
        _id: foundUser._id,
        email: foundUser.email,
      },
      fullName: foundUser.fullName || null,
    };

    if (foundUser.address) {
      response.deliveryData = foundUser.address | null;
    }

    console.log(response);
    return res.json(response);
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
