const { body, validationResult } = require("express-validator");
const User = require("../model/User.cjs");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const validateLoginInput = [
  body("user").notEmpty().withMessage("Username is required"),
  body("pwd").notEmpty().withMessage("Password is required"),
];

const handleLogin = async (req, res, next) => {
  // Validate input
  try {
    await Promise.all(
      validateLoginInput.map((validation) => validation.run(req))
    );
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { user, pwd } = req.body;

    const foundUser = await User.findOne({ username: user }).exec();
    if (!foundUser) {
      return res.status(401).json({ message: "Unauthorized" });
    }

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
      await foundUser.save();

      // Create a secure cookie with the refresh token
      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 24 * 60 * 60 * 1000,
      });

      // Send authorization roles and access token to the user
      return res.json({ accessToken });
    } else {
      return res.sendStatus(401);
    }
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { handleLogin };

// const validateLoginInput = [
//   body("user").notEmpty().withMessage("Username is required"),
//   body("pwd").notEmpty().withMessage("Password is required"),
// ];

// const handleLogin = async (req, res) => {
//   // Validate input
//   validateLoginInput(req, res, async () => {
//     const { user, pwd } = req.body;

//     const foundUser = await User.findOne({ username: user }).exec();
//     if (!foundUser)
//       return res.sendStatus(401).json({ message: "Unauthorized" });

//     // Evaluate password
//     const match = await bcrypt.compare(pwd, foundUser.password);
//     if (match) {
//       // Create JWTs
//       const accessToken = jwt.sign(
//         {
//           UserInfo: {
//             username: foundUser.username,
//           },
//         },
//         process.env.ACCESS_TOKEN_SECRET,
//         { expiresIn: "10s" }
//       );
//       const refreshToken = jwt.sign(
//         { username: foundUser.username },
//         process.env.REFRESH_TOKEN_SECRET,
//         { expiresIn: "1h" }
//       );

//       // Saving refreshToken with the current user
//       foundUser.refreshToken = refreshToken;
//       const result = await foundUser.save();
//       console.log(result);

//       // Create a secure cookie with the refresh token
//       res.cookie("jwt", refreshToken, {
//         httpOnly: true,
//         secure: true,
//         sameSite: "None",
//         maxAge: 24 * 60 * 60 * 1000,
//       });

//       // Send authorization roles and access token to the user
//       res.json({ accessToken });
//     } else {
//       res.sendStatus(401);
//     }
//   });
// };

module.exports = { handleLogin };
