const express = require("express");
const router = express.Router();
// const Order = require("../model/Order.cjs");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const endpointSecret =
  "whsec_d56774b2a8e0f238a10a5407904d982d420dab943c4971aa6f60450d9bc123c1";

router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (request, response) => {
    const sig = request.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
      console.log("webhook verified");
    } catch (err) {
      console.log(`Webhook Error: ${err.message}`);
      response.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    switch (event.type) {
      case "payment_intent.succeeded":
        const session = event.data.object.id;
        console.log(session);

        const metadata = event.data.object.metadata;

        console.log("Metadata:", metadata);
        break;
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    response.send().end();
  }
);

module.exports = router;
