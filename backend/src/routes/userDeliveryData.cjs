const express = require("express");
const router = express.Router();
const User = require("../model/User.cjs");

router.get("/user/:userId/address", async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      throw { status: 404, message: "User not found" };
    }

    if (!user.address) {
      return res.json({
        message: "Dane do wysyłki zamówień jeszcze nie zostały podane",
      });
    }

    res.json(user.address);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
