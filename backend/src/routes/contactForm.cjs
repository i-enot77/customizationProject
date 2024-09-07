const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

router.post("/submit-form", async (req, res, next) => {
  try {
    const { firstName, lastName, userEmail, phoneNumber, city, message } =
      req.body;

    // Create the email content
    const emailContent = `
      Name: ${firstName}
      Last Name: ${lastName}
      Email: ${userEmail}
      Phone Number: ${phoneNumber}
      City: ${city}
      Message: ${message}
    `;

    const mailOptions = {
      from: userEmail,
      to: process.env.EMAIL_USERNAME,
      subject: "New Form Submission",
      text: emailContent,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Form submission successful" });
  } catch (error) {
    console.error("Error processing form submission:", error);

    const err = new Error("Internal Server Error");
    err.status = 500;
    next(err);
  }
});

module.exports = router;
