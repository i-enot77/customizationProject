const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Sofa = require("../model/Sofa.cjs");
const Armchair = require("../model/Armchair.cjs");
const Chair = require("../model/Chair.cjs");
const Table = require("../model/Table.cjs");
const Lamp = require("../model/Lamp.cjs");

router.get("/:category/:id", async (req, res) => {
  const { category, id } = req.params;
  console.log(req.params);
  try {
    let product;

    switch (category) {
      case "sofy":
        product = await Sofa.findById(id)
          .populate("baseMaterial")
          .populate("legsMaterial");
        break;
      case "fotele":
        product = await Armchair.findById(id)
          .populate("baseMaterial")
          .populate("legsMaterial");
        break;
      case "krzesła":
        product = await Chair.findById(id)
          .populate("baseMaterial")
          .populate("legsMaterial");
        break;
      case "stoły":
        product = await Table.findById(id)
          .populate("baseMaterial")
          .populate("legsMaterial");
        break;
      case "lampy":
        product = await Lamp.findById(id).populate("baseMaterial");
        break;
      default:
        return res.status(400).json({ message: "Invalid category" });
    }

    res.json(product);
    console.log(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
