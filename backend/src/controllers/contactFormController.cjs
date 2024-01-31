const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendContactForm = async (req, res) => {
  try {
    const { userName, lastName, userEmail, phoneNumber, address, message } =
      req.body;

    // Create the email content
    const emailContent = `
      Name: ${userName}
      Last Name: ${lastName}
      Email: ${userEmail}
      Phone Number: ${phoneNumber}
      Address: ${address}
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
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { sendContactForm };
