const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const materialSchema = new Schema({
  id: { type: String, required: true },
  name: {
    type: String,
    required: true,
  },
  ref: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Material", materialSchema);
