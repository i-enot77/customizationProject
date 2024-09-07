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

router.post("/auth", async (req, res, next) => {
  try {
    await Promise.all(
      validateLoginInput.map((validation) => validation.run(req))
    );
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next({
        status: 400,
        message: "Validation errors",
        errors: errors.array(),
      });
    }

    const { userEmail, pwd, persist } = req.body;
    const foundUser = await User.findOne({ email: userEmail }).exec();
    if (!foundUser) {
      throw { status: 401, message: "Nie znaleziono użytkownika" };
    }

    const match = await bcrypt.compare(pwd, foundUser.password);
    if (!match) {
      throw { status: 401, message: "Błędne hasło" };
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
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
      maxAge: persist ? 24 * 60 * 60 * 1000 : 60 * 60 * 1000,
    });

    return res.json({
      userData: {
        _id: foundUser._id,
        email: foundUser.email,
      },
      fullName: foundUser.fullName || null,
      userPhone: foundUser.userPhone || null,
      userAddress: foundUser.userAddress || null,
      deliveryAddress: foundUser.deliveryAddress || null,
    });
  } catch (error) {
    console.error("Wystąpił błąd pod czas logowania:", error);
    next(error);
  }
});

module.exports = router;
