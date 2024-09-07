const { body, validationResult } = require("express-validator");

const emailUpdateValidation = [
  body("newEmail").isEmail().withMessage("Please provide a valid email"),
  body("newEmail").custom(async (newEmail, { req }) => {
    const existingUser = await User.findOne({ email: newEmail });
    if (existingUser) {
      throw new Error("Email already in use");
    }

    if (newEmail === req.user.email) {
      throw new Error("New email cannot be the same as current email");
    }
    return true;
  }),
];

module.exports = emailUpdateValidation;
