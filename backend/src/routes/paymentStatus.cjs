const express = require("express");
const router = express.Router();
const Order = require("../model/Order.cjs");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const endpointSecret =
  "whsec_d56774b2a8e0f238a10a5407904d982d420dab943c4971aa6f60450d9bc123c1";

router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    console.log("test");
    const sig = req.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
      console.log("Webhook verified");
    } catch (err) {
      console.error(`Webhook Error: ${err.message}`);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle payment_intent.succeeded event
    if (event.type === "payment_intent.succeeded") {
      const paymentIntent = event.data.object;

      try {
        // Update the order status to "completed" in the database
        const orderId = paymentIntent.metadata.orderId;
        const order = await Order.findById(orderId);

        if (!order) {
          throw new Error("Order not found");
        }

        order.status = "completed"; // Update the status to completed
        order.updated_at = new Date(); // Update the timestamp

        await order.save();
        console.log("Order updated successfully");
        res.status(200).json({ message: "Order updated successfully" });
      } catch (error) {
        console.error("Error updating order:", error);
        res.status(500).json({ error: "Failed to update order" });
      }
    }

    // Handle other event types
    else {
      console.log(`Unhandled event type ${event.type}`);
      res.status(400).end();
    }
  }
);

module.exports = router;

// const express = require("express");
// const router = express.Router();
// const Order = require("../model/Order.cjs");
// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// const endpointSecret =
//   "whsec_d56774b2a8e0f238a10a5407904d982d420dab943c4971aa6f60450d9bc123c1";

// router.post(
//   "/webhook",
//   express.raw({ type: "application/json" }),
//   async (req, res) => {
//     const sig = req.headers["stripe-signature"];

//     let event;

//     try {
//       event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
//       console.log("Webhook verified");
//     } catch (err) {
//       console.log(`Webhook Error: ${err.message}`);
//       res.status(400).send(`Webhook Error: ${err.message}`);
//       return;
//     }

//     // Handle the event
//     if (event.type === "checkout.session.completed") {
//       const session = event.data.object;

//       const orderId = session.metadata.orderId;
//       const user = JSON.parse(session.metadata.user);
//       const products = JSON.parse(session.metadata.products);
//       const shipping = JSON.parse(session.metadata.shipping);

//       try {
//         // Create and save the order in the database
//         const newOrder = await Order.create({
//           _id: orderId,
//           products: products.map((product) => ({
//             id: product.id,
//             name: product.name,
//             quantity: product.quantity,
//             baseMaterialId: product.baseMaterial._id,
//             legsMaterialId: product.legsMaterial._id,
//           })),
//           user_order_data: {
//             email: user.email,
//             country: user.country,
//             firstName: user.firstName,
//             lastName: user.lastName,
//             address: user.address,
//             zipCode: user.zipCode,
//             city: user.city,
//             phone: user.phone,
//           },
//           shipping: shipping.method,
//           status: "completed",
//           total_price:
//             products.reduce(
//               (total, product) => total + product.price * product.quantity,
//               0
//             ) + shipping.cost,
//           updated_at: new Date(),
//         });

//         await newOrder.save();
//         console.log("Order saved successfully");
//         res.status(200).json({ message: "Order saved successfully" });
//       } catch (error) {
//         console.error("Error saving order:", error);
//         res.status(500).json({ error: "Failed to save order" });
//       }
//     } else {
//       console.log(`Unhandled event type ${event.type}`);
//     }

//     // Return a response to acknowledge receipt of the event
//     res.send().end();
//   }
// );

// module.exports = router;

// const express = require("express");
// const router = express.Router();
// // const Order = require("../model/Order.cjs");

// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// const endpointSecret =
//   "whsec_d56774b2a8e0f238a10a5407904d982d420dab943c4971aa6f60450d9bc123c1";

// router.post(
//   "/webhook",
//   express.raw({ type: "application/json" }),
//   async (request, response) => {
//     const sig = request.headers["stripe-signature"];

//     let event;

//     try {
//       event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
//       console.log("webhook verified");
//     } catch (err) {
//       console.log(`Webhook Error: ${err.message}`);
//       response.status(400).send(`Webhook Error: ${err.message}`);
//       return;
//     }

//     switch (event.type) {
//       case "payment_intent.succeeded":
//         const session = event.data.object.id;
//         console.log(session);

//         const metadata = event.data.object.metadata;

//         console.log("Metadata:", metadata);
//         break;
//       // ... handle other event types
//       default:
//         console.log(`Unhandled event type ${event.type}`);
//     }

//     response.send().end();
//   }
// );

// module.exports = router;
