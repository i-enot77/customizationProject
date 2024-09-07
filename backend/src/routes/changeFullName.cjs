const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken.cjs");
const User = require("../model/User.cjs");

router.post("/change-full-name", verifyToken, async (req, res, next) => {
  const { firstName, lastName } = req.body;
  const user = req.user;

  try {
    if (!user.fullName) {
      user.fullName = {};
    }

    user.fullName.firstName = firstName;
    user.fullName.lastName = lastName;
    await user.save();

    return res.status(200).json(user.fullName);
  } catch (error) {
    error.status = 500;
    next(error);
  }
});

module.exports = router;
