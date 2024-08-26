const express = require("express");
const router = express.Router();
const User = require("../model/User.cjs");

router.get("/user/:userId/address", async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the user has any addresses
    if (!user.address) {
      return res.json({
        message: "Dane do wysyłki zamówień jeszcze nie zostały podane",
      });
    }

    res.json(user.address); // Send the array of addresses
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
