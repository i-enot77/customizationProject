const express = require("express");
const router = express.Router();
const User = require("../model/User.cjs");
const { body, validationResult } = require("express-validator");
const verifyToken = require("../middleware/verifyToken.cjs");

// Validation rules
const addressValidation = [
  body("firstName").not().isEmpty().withMessage("First name is required"),
  body("lastName").not().isEmpty().withMessage("Last name is required"),
  body("country").not().isEmpty().withMessage("Country is required"),
  body("address").not().isEmpty().withMessage("Address is required"),
  body("zipCode").not().isEmpty().withMessage("Zip code is required"),
  body("city").not().isEmpty().withMessage("City is required"),
  body("phoneNumber").not().isEmpty().withMessage("Phone number is required"),
];

router.post(
  "/update-delivery-address",
  verifyToken,
  addressValidation,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { deliveryData } = req.body;
    const user = req.user;

    try {
      user.deliveryAddress = {
        ...user.deliveryAddress,
        firstName: deliveryData.firstName,
        lastName: deliveryData.lastName,
        country: deliveryData.country,
        address: deliveryData.address,
        zipCode: deliveryData.zipCode,
        city: deliveryData.city,
        phoneNumber: deliveryData.phoneNumber,
      };

      await user.save();
      res.status(200).json(user.deliveryAddress);
    } catch (error) {
      error.status = 500;
      next(error);
    }
  }
);

module.exports = router;
