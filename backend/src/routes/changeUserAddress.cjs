const express = require("express");
const router = express.Router();
const User = require("../model/User.cjs");
const verifyToken = require("../middleware/verifyToken.cjs");

router.post("/update-address", verifyToken, async (req, res, next) => {
  const { country, address, zipCode, city } = req.body;
  const user = req.user;

  try {
    if (!user.userAddress) {
      user.userAddress = {};
    }

    user.userAddress = {
      country,
      address,
      zipCode,
      city,
    };

    await user.save();
    return res.status(200).json({
      message: "Address updated successfully",
      userAddress: user.userAddress,
    });
  } catch (error) {
    console.error("Error updating address:", error);
    error.status = 500;
    next(error);
  }
});

module.exports = router;
