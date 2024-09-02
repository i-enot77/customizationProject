const express = require("express");
const router = express.Router();
const User = require("../model/User.cjs");
const verifyToken = require("../middleware/verifyToken.cjs");

router.post("/update-address", verifyToken, async (req, res) => {
  //   const errors = validationResult(req);
  //   if (!errors.isEmpty()) {
  //     return res.status(400).json({ errors: errors.array() });
  //   }

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

    return res.status(200).json(user.userAddress);
  } catch (error) {
    console.error("Error updating address:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
