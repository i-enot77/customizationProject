const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Material = require("./Material.cjs");

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    modelPath: { type: String, required: true },
    baseMaterial: { type: Schema.Types.ObjectId, ref: Material },
    assignedBaseMtl: [{ type: Schema.Types.ObjectId, ref: Material }],
  },
  { discriminatorKey: "type" }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
