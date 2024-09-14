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

router.post("/create-checkout-session", async (req, res, next) => {
  try {
    const newOrderId = new mongoose.Types.ObjectId();
    console.log(newOrderId);
    const { userId, email, deliveryAddress, products, shipping } = req.body;

    if (!email || !products || products.length === 0 || !shipping) {
      throw new Error("Invalid request data");
    }

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
        productType: product.product.category,
        quantity: product.quantity,
        baseMaterialId: product.baseMaterial ? product.baseMaterial._id : null,
        legsMaterialId: product.legsMaterial ? product.legsMaterial._id : null,
      });
    }

    if (shipping && shipping.shippingCost) {
      lineItems.push({
        price_data: {
          currency: "pln",
          product_data: {
            name: "Shipping Cost",
          },
          unit_amount: Math.round(shipping.shippingCost * 100),
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
        email: email,
        phone: deliveryAddress.phoneNumber,
        firstName: deliveryAddress.firstName,
        lastName: deliveryAddress.lastName,
        address: deliveryAddress.address,
        zipCode: deliveryAddress.zipCode,
        city: deliveryAddress.city,
        country: deliveryAddress.country,
      },
      updated_at: new Date(),
      shipping: shipping.shippingMethod,
    });

    await newOrder.save();
    console.log("Order created and saved successfully");

    // Create the Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"], //"p24", "blik","google_pay", "apple_pay"
      customer_email: email,
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
  } catch (error) {
    console.error("failed:", error);
    next(error);
  }
});

module.exports = router;
