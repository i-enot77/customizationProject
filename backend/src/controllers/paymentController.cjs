const Sofa = require("../model/Sofa.cjs");
const Lamp = require("../model/Lamp.cjs");
const Armchair = require("../model/Armchair.cjs");
const Chair = require("../model/Chair.cjs");
const Table = require("../model/Table.cjs");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const getProductByCategory = async (item) => {
  const productId = item.id;
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

  const product = await ProductModel.findOne({ _id: productId });
  if (!product) {
    throw new Error(`Product with ID ${productId} not found`);
  }

  return {
    name: product.name,
    price: product.price,
    amount: product.amount,
  };
};

const paymentIntent = async (req, res) => {
  try {
    const { id, customer, products, shipping } = req.body;
    console.log(customer, products, shipping);

    const lineItems = [];

    // Iterate over products in orderData and fetch product details
    for (const product of products) {
      const productDetails = await getProductByCategory(product);
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
    }

    // Add shipping cost to line items if available
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

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      customer_email: customer.email,
      line_items: lineItems,
      mode: "payment",
      currency: "pln",
      payment_intent_data: {
        metadata: {
          orderId: id,
        },
      },
      success_url: "http://localhost:5173/success",
      cancel_url: "http://localhost:5173/cancel",
    });

    res.json({
      id: session.id,
    });
  } catch (e) {
    return res.status(400).send({
      error: {
        message: e.message,
      },
    });
  }
};
module.exports = { paymentIntent };
