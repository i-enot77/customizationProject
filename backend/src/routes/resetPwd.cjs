const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../model/User.cjs");

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

    res.json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Password reset failed", error);
    if (error instanceof jwt.JsonWebTokenError) {
      error.status = 400; // Specific status for JWT errors
      error.message = "Invalid or expired token";
    }
    next(error);
  }
});

module.exports = router;
