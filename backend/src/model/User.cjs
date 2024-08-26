const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Order = require("./Order.cjs");

const addressSchema = new Schema({
  country: { type: String, default: "" },
  address: { type: String, default: "" },
  zipCode: { type: String, default: "" },
  city: { type: String, default: "" },
  phone: { type: String, default: "" },
});

const fullNameSchema = new Schema({
  firstName: { type: String, default: "" },
  lastName: { type: String, default: "" },
});

const userSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, required: true },
  email: { type: String, required: true, unique: true },
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
  address: addressSchema,
});

module.exports = mongoose.model("User", userSchema);
