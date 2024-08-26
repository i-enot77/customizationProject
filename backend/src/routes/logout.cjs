const secureCookie = process.env.NODE_ENV === "production";
const sameSitePolicy = secureCookie ? "None" : "Lax"; // 'None' requires 'secure'
const express = require("express");
const router = express.Router();
const User = require("../model/User.cjs");

router.post("/logout", async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204);

  const refreshToken = cookies.jwt;
  const foundUser = await User.findOne({ refreshToken }).exec();

  if (!foundUser) {
    res.clearCookie("jwt", {
      httpOnly: true,
      sameSite: sameSitePolicy,
      secure: secureCookie,
    });
    return res.sendStatus(204);
  }

  foundUser.refreshToken = "";
  await foundUser.save();

  res.clearCookie("jwt", {
    httpOnly: true,
    sameSite: sameSitePolicy,
    secure: secureCookie,
  });
  console.log("logged out");
  return res.sendStatus(204);
});

module.exports = router;
