const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Material = require("./Material.cjs");

const tableSchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  modelPath: { type: String, required: true },
  dimensions: {
    height: { type: Number, required: true },
    width: { type: Number, required: true },
    legHeight: { type: Number, required: true },
    weight: { type: Number, required: true },
    seats: { type: Number, required: true },
    countertopThickness: { type: Number, required: true },
    length: { type: Number, required: true },
  },
  baseMaterial: { type: Schema.Types.ObjectId, ref: Material },
  legsMaterial: { type: Schema.Types.ObjectId, ref: Material },
});

module.exports = mongoose.model("Table", tableSchema);
