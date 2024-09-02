const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const verifyToken = require("../middleware/verifyToken.cjs");

router.post("/refresh", verifyToken, async (req, res) => {
  const user = req.user;

  const accessToken = jwt.sign(
    { id: user._id },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" }
  );

  const newRefreshToken = jwt.sign(
    { id: user._id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "1d" }
  );

  user.refreshToken = newRefreshToken;
  await user.save();

  res.cookie("jwt", newRefreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "None", // if frontend and backend are served from different origins
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  });

  const response = {
    userData: {
      _id: user._id,
      email: user.email,
    },
    fullName: user.fullName || null,
    userPhone: user.userPhone || null,
  };

  if (user.userAddress) {
    response.userAddress = user.userAddress || null;
  }

  if (foundUser.deliveryAddress) {
    response.deliveryData = foundUser.deliveryAddress || null;
  }

  console.log(response);
  return res.json(response);
});

module.exports = router;
