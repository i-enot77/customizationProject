const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Order = require("../model/Order.cjs");

const endpointSecret =
  "whsec_d56774b2a8e0f238a10a5407904d982d420dab943c4971aa6f60450d9bc123c1";

router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (req, res, next) => {
    const sig = req.headers["stripe-signature"];

    try {
      const event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        endpointSecret
      );
      console.log("Webhook verified");

      if (event.type === "payment_intent.succeeded") {
        const paymentIntent = event.data.object;
        const orderId = paymentIntent.metadata.orderId;
        const order = await Order.findById(orderId);

        if (!order) {
          throw new Error("Order not found");
        }

        order.status = "completed";
        order.updated_at = new Date();
        await order.save();

        console.log("Order updated successfully");
        return res.status(200).json({ message: "Order updated successfully" });
      } else {
        throw { status: 400, message: `Unhandled event type ${event.type}` };
      }
    } catch (err) {
      next(err);
    }
  }
);

router.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  const status = err.status || 500;
  const message = err.message || "Internal Server Error";

  console.error(`Error: ${message}`);
  res.status(status).json({ success: false, message });
});

module.exports = router;
