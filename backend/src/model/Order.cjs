const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  products: [
    {
      id: { type: String, required: true },
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
    },
  ],
  status: {
    type: String,
    enum: ["pending", "completed", "canceled"], //possible status values
    default: "pending", // Default status
  },
  customer: {
    // id: { type: String, required: true },
    email: { type: String, required: true },
    country: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    address: { type: String, required: true },
    zipCode: { type: String, required: true },
    city: { type: String, required: true },
    phone: { type: String, required: true },
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  shipping: { type: String, required: true },
});

module.exports = mongoose.model("Order", orderSchema);
