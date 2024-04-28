const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Material = require("./Material.cjs");

const armchairSchema = new Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  modelPath: { type: String, required: true },
  dimensions: {
    height: { type: Number, required: true },
    width: { type: Number, required: true },
    depth: { type: Number, required: true },
    seatHeight: { type: Number, required: true },
    armsrestHeight: { type: Number, required: true },
    legHeight: { type: Number, required: true },
    weight: { type: Number, required: true },
  },
  baseMaterial: { type: Schema.Types.ObjectId, ref: Material },
  legsMaterial: { type: Schema.Types.ObjectId, ref: Material },
});
// baseMaterial: [{ type: Schema.Types.ObjectId, ref: Material }],
// legsMaterial: [{ type: Schema.Types.ObjectId, ref: Material }],
module.exports = mongoose.model("Armchair", armchairSchema);
