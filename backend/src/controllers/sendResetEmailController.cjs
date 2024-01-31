const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

const User = require("../model/User.cjs");
// disable certificate verification in a development environment
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendResetEmail = async (req, res) => {
  const { username } = req.body;

  try {
    const user = await User.findOne({ username }).exec();
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate a JWT token with user username as payload
    const generateToken = (username) => {
      return jwt.sign({ username }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1h",
      });
    };

    // Generate JWT token with user username
    const resetToken = generateToken(username);

    // Send username with password reset link
    const resetLink = `http://localhost:5173/reset-password/${resetToken}`;

    const mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: username,
      subject: "Password Reset Request",
      text: `Click the following link to reset your password: ${resetLink}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email", error);
        return res.status(500).json({ message: "Error sending email" });
      }

      console.log("Email sent: " + info.response);
      res.json({ message: "Password reset link sent to your email" });
    });
  } catch (error) {
    console.error("Password reset request failed", error);
    res.status(500).json({ message: "Password reset request failed" });
  }
};

module.exports = { sendResetEmail };
