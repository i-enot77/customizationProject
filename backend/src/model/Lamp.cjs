const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Material = require("./Material.cjs");

const lapmSchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  modelPath: { type: String, required: true },
  dimensions: {
    height: { type: Number, required: true },
    weight: { type: Number, required: true },
    cableLength: { type: Number, required: true },
    diameter: { type: Number, required: true },
  },
  baseMaterial: [{ type: Schema.Types.ObjectId, ref: Material }],
});

module.exports = mongoose.model("Lamp", lapmSchema);
