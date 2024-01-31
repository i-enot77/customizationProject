const User = require("../model/User.cjs");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handleNewUser = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: "Username and password are required." });

  // Check for duplicate usernames in the database
  const duplicate = await User.findOne({ username: user }).exec();
  if (duplicate) return res.sendStatus(409).json({ message: "Username taken" });

  try {
    // Encrypt the password
    const hashedPwd = await bcrypt.hash(pwd, 10);

    // Create and store the new user
    const newUser = await User.create({
      username: user,
      password: hashedPwd,
    });

    // Generate JWT access token and refresh token
    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: newUser.username,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "60s" }
    );
    const refreshToken = jwt.sign(
      { username: newUser.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1h" }
    );

    // Saving refreshToken with the current user
    newUser.refreshToken = refreshToken;
    const result = await newUser.save();
    console.log(result);

    // Send the access token in a secure HTTP-only cookie
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    });

    // Send authorization roles and access token to the user
    res.status(201).json({
      success: `New user ${user} created and logged in!`,
      accessToken,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { handleNewUser };
