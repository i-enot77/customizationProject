const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const materialSchema = new Schema({
  id: { type: String, required: true },
  category: { type: String, required: true },
  name: { type: String, required: true },
  repeat: { type: Number, default: null },
  ref: {
    map: { type: String, required: true },
    displacementMap: { type: String, required: true },
    normalMap: { type: String, required: true },
    roughnessMap: { type: String, required: true },
    aoMap: { type: String, default: null },
    metalnessMap: { type: String, default: null },
  },
});

module.exports = mongoose.model("Material", materialSchema);
