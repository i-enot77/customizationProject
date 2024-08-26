const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../model/User.cjs");

router.post("/refresh", async (req, res) => {
  const refreshToken = req.cookies.jwt;
  if (!refreshToken) {
    return res.status(401).json({ message: "No refresh token provided" });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const user = await User.findById(decoded.id);

    if (!user || user.refreshToken !== refreshToken) {
      return res.status(403).json({ message: "Refresh token is not valid" });
    }

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

    // Send the new refresh token in an HTTP-only cookie
    res.cookie("jwt", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "None", // if  frontend and backend are served from different origins
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    const response = {
      userData: {
        _id: user._id,
        email: user.email,
      },
      fullName: user.fullName || null,
    };

    if (user.address) {
      response.deliveryData = user.address;
    } else {
      response.message = "Delivery address data is not provided";
    }

    console.log(response);
    return res.json(response);
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(403).json({ message: "Refresh token expired" });
    }
    return res.status(403).json({ message: "Invalid token" });
  }
});

module.exports = router;
