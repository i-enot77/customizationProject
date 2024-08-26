const mongoose = require("mongoose");
const Material = require("./Material.cjs");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, required: true, auto: true }, // Auto-generate _id if not provided
  user_id: { type: Schema.Types.ObjectId, ref: "User", required: false }, // Ref to User, optional for guests
  order_date: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ["pending", "completed", "canceled"], // Possible status values
    default: "pending", // Default status
  },
  total_price: { type: Number, required: true },

  products: [
    {
      _id: { type: Schema.Types.ObjectId, required: true },
      quantity: { type: Number, required: true },
      baseMaterialId: {
        type: Schema.Types.ObjectId,
        ref: Material,
        required: true,
      },
      legsMaterialId: {
        type: Schema.Types.ObjectId,
        ref: Material,
        required: false,
      },
    },
  ],

  // Subdocument for guest checkout details
  user_order_data: {
    email: { type: String, required: false },
    country: { type: String, required: false },
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
    address: { type: String, required: false },
    zipCode: { type: String, required: false },
    city: { type: String, required: false },
    phone: { type: String, required: false },
  },

  updated_at: { type: Date, default: Date.now },
  shipping: { type: String, required: true },
});

module.exports = mongoose.model("Order", orderSchema);

// const orderSchema = new mongoose.Schema({
//   orderId: { type: String, required: true },
//   userId: { type: String, required: false },
//   user: { type: Object, required: true },
//   products: { type: Array, required: true },
//   shippingMethod: { type: String, required: true },
//   totalAmount: { type: Number, required: true },
//   paymentStatus: { type: String, required: true },
//   currency: { type: String, required: true },
//   createdAt: { type: Date, default: Date.now },
// });
