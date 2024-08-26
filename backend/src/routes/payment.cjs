const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Order = require("../model/Order.cjs");
const Sofa = require("../model/Sofa.cjs");
const Lamp = require("../model/Lamp.cjs");
const Armchair = require("../model/Armchair.cjs");
const Chair = require("../model/Chair.cjs");
const Table = require("../model/Table.cjs");

const getProductByCategory = async (item) => {
  const productId = item._id;
  const category = item.category;

  let ProductModel;
  switch (category) {
    case "sofy":
      ProductModel = Sofa;
      break;
    case "lampy":
      ProductModel = Lamp;
      break;
    case "fotele":
      ProductModel = Armchair;
      break;
    case "krzesła":
      ProductModel = Chair;
      break;
    case "stoły":
      ProductModel = Table;
      break;
    default:
      throw new Error("Invalid category");
  }

  const product = await ProductModel.findById(productId);
  if (!product) {
    throw new Error(`Product with ID ${productId} not found`);
  }

  return {
    name: product.name,
    price: product.price,
  };
};

router.post("/create-checkout-session", async (req, res) => {
  try {
    const newOrderId = new mongoose.Types.ObjectId();
    const { userId, user, products, shipping } = req.body;

    if (!user || !products || products.length === 0 || !shipping) {
      return res
        .status(400)
        .send({ error: { message: "Invalid request data" } });
    }

    console.log("User:", user);
    console.log("Products:", products);
    console.log("Shipping:", shipping);

    const lineItems = [];
    const productOrderData = [];

    // Iterate over products and fetch price from db
    for (const product of products) {
      const productDetails = await getProductByCategory(product.product);
      lineItems.push({
        price_data: {
          currency: "pln",
          product_data: {
            name: productDetails.name,
          },
          unit_amount: Math.round(productDetails.price * 100),
        },
        quantity: product.quantity,
      });

      productOrderData.push({
        _id: product.product._id,
        quantity: product.quantity,
        baseMaterialId: product.baseMaterial ? product.baseMaterial._id : null,
        legsMaterialId: product.legsMaterial ? product.legsMaterial._id : null,
      });
    }

    if (shipping && shipping.cost) {
      lineItems.push({
        price_data: {
          currency: "pln",
          product_data: {
            name: "Shipping Cost",
          },
          unit_amount: Math.round(shipping.cost * 100),
        },
        quantity: 1,
      });
    }

    const totalPrice =
      lineItems.reduce(
        (total, item) => total + item.price_data.unit_amount * item.quantity,
        0
      ) / 100;

    // Create and save the order in the database
    const newOrder = new Order({
      _id: newOrderId,
      user_id: userId || null,
      order_date: new Date(),
      status: "pending", // Initially set to pending
      total_price: totalPrice,
      products: productOrderData,
      user_order_data: {
        email: user.email,
        country: user.country,
        firstName: user.firstName,
        lastName: user.lastName,
        address: user.address,
        zipCode: user.zipCode,
        city: user.city,
        phone: user.phone,
      },
      updated_at: new Date(),
      shipping: shipping.method,
    });

    await newOrder.save();
    console.log("Order created and saved successfully");

    // Create the Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      customer_email: user.email,
      line_items: lineItems,
      mode: "payment",
      currency: "pln",
      payment_intent_data: {
        metadata: {
          orderId: newOrder._id.toString(),
        },
      },
      success_url: "http://localhost:5173/success",
      cancel_url: "http://localhost:5173/cancel",
    });

    console.log(session);
    res.json({ id: session.id });
  } catch (e) {
    console.error("Error creating payment intent:", e);
    res.status(400).send({
      error: {
        message: e.message,
      },
    });
  }
});

module.exports = router;
