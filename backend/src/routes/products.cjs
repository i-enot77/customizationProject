const express = require("express");
const router = express.Router(); // Define the router here

const Sofa = require("../model/Sofa.cjs");
const Armchair = require("../model/Armchair.cjs");
const Chair = require("../model/Chair.cjs");
const Table = require("../model/Table.cjs");
const Lamp = require("../model/Lamp.cjs");

router.get("/:category", async (req, res) => {
  const { category } = req.params;
  let items;

  try {
    switch (category) {
      case "sofy":
        items = await Sofa.find()
          .populate("baseMaterial")
          .populate("legsMaterial");
        break;
      case "fotele":
        items = await Armchair.find()
          .populate("baseMaterial")
          .populate("legsMaterial");
        break;
      case "krzesła":
        items = await Chair.find()
          .populate("baseMaterial")
          .populate("legsMaterial");
        break;
      case "stoły":
        items = await Table.find()
          .populate("baseMaterial")
          .populate("legsMaterial");
        break;
      case "lampy":
        items = await Lamp.find().populate("baseMaterial");
        break;
      default:
        return res.status(400).json({ message: "Invalid category" });
    }

    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
