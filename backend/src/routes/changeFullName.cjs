const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken.cjs");
const User = require("../model/User.cjs");

router.post("/change-full-name", verifyToken, async (req, res) => {
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
    console.error("Error updating full name:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
