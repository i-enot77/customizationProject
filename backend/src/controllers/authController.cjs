const { body } = require("express-validator");
const User = require("../model/User.cjs");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const validateLoginInput = [
  body("user").notEmpty().withMessage("Username is required"),
  body("pwd").notEmpty().withMessage("Password is required"),
];

const handleLogin = async (req, res) => {
  // Validate input
  validateLoginInput(req, res, async () => {
    const { user, pwd } = req.body;

    const foundUser = await User.findOne({ username: user }).exec();
    if (!foundUser)
      return res.sendStatus(401).json({ message: "Unauthorized" });

    // Evaluate password
    const match = await bcrypt.compare(pwd, foundUser.password);
    if (match) {
      // Create JWTs
      const accessToken = jwt.sign(
        {
          UserInfo: {
            username: foundUser.username,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "10s" }
      );
      const refreshToken = jwt.sign(
        { username: foundUser.username },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "1h" }
      );

      // Saving refreshToken with the current user
      foundUser.refreshToken = refreshToken;
      const result = await foundUser.save();
      console.log(result);

      // Create a secure cookie with the refresh token
      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 24 * 60 * 60 * 1000,
      });

      // Send authorization roles and access token to the user
      res.json({ accessToken });
    } else {
      res.sendStatus(401);
    }
  });
};

module.exports = { handleLogin };
