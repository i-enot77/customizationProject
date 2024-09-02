const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Order = require("./Order.cjs");

const userAddressSchema = new Schema({
  country: { type: String, default: "" },
  address: { type: String, default: "" },
  zipCode: { type: String, default: "" },
  city: { type: String, default: "" },
});

const deliveryAddressSchema = new Schema({
  firstName: { type: String, default: "" },
  lastName: { type: String, default: "" },
  country: { type: String, default: "" },
  address: { type: String, default: "" },
  zipCode: { type: String, default: "" },
  city: { type: String, default: "" },
  phoneNumber: { type: String, default: "" },
});

const fullNameSchema = new Schema({
  firstName: { type: String, default: "" },
  lastName: { type: String, default: "" },
});

const userSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, required: true },
  email: { type: String, required: true, unique: true },
  userPhone: { type: String, default: "" },
  fullName: fullNameSchema,
  password: { type: String, required: true },
  created_at: { type: Date, required: true },
  orders: [{ type: Schema.Types.ObjectId, ref: Order }],
  refreshToken: String,
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
    required: true,
  },
  userAddress: userAddressSchema,
  deliveryAddress: deliveryAddressSchema,
});

module.exports = mongoose.model("User", userSchema);
