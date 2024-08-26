const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Material = require("./Material.cjs");

const sofaSchema = new Schema({
  id: { type: String, required: true },
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
  },
  baseMaterial: { type: Schema.Types.ObjectId, ref: Material, required: true },
  legsMaterial: { type: Schema.Types.ObjectId, ref: Material },

  assignedBaseMtl: [{ type: Schema.Types.ObjectId, ref: Material }],
  assignedLegsMtl: [{ type: Schema.Types.ObjectId, ref: Material }],
});

module.exports = mongoose.model("Chair", sofaSchema);
