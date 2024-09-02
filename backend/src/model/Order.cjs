const mongoose = require("mongoose");
const Material = require("./Material.cjs");
const User = require("./User.cjs");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, required: true, auto: true },
  user_id: { type: Schema.Types.ObjectId, ref: "User", required: false }, // Optional reference to User
  order_date: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ["pending", "completed", "canceled"],
    default: "pending",
  },
  total_price: { type: Number, required: true },

  products: [
    {
      _id: { type: Schema.Types.ObjectId, required: true },
      productType: {
        type: String,
        required: true,
        enum: ["Sofa", "Armchair", "Chair", "Table", "Lamp"],
      }, //handle saving product type
      quantity: { type: Number, required: true },
      baseMaterialId: {
        type: Schema.Types.ObjectId,
        ref: "Material",
        required: true,
      },
      legsMaterialId: {
        type: Schema.Types.ObjectId,
        ref: "Material",
        required: false,
      },
    },
  ],
  user_order_data: {
    email: { type: String },
    phone: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    address: { type: String },
    zipCode: { type: String },
    city: { type: String },
    country: { type: String },
  },

  updated_at: { type: Date, default: Date.now },
  shipping: { type: String, required: true },
});

module.exports = mongoose.model("Order", orderSchema);
