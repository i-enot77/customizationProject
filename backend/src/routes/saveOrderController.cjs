const express = require("express");
const router = express.Router();
const Order = require("../model/Order.cjs");

router.post("/save-order", async (req, res) => {
  try {
    const { id, customer, products, shipping } = req.body;
    console.log(customer, products, shipping);
    console.log(req.body);

    const newOrder = await Order.create({
      id: id,
      products: products.map((product) => ({
        id: product.id,
        name: product.name,
        quantity: product.quantity,
      })),
      customer: {
        email: customer.email,
        country: customer.country,
        firstName: customer.firstName,
        lastName: customer.lastName,
        address: customer.address,
        zipCode: customer.zipCode,
        city: customer.city,
        phone: customer.phone,
      },
      shipping: shipping.method,
      status: "pending",
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    console.log(newOrder);

    await newOrder.save();

    res.status(201).json({ message: "Order saved successfully" });
  } catch (error) {
    console.error("Error saving order:", error);
    res.status(500).json({ error: "Failed to save order" });
  }
});

module.exports = router;
