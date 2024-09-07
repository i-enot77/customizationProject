const express = require("express");
const router = express.Router();

const Sofa = require("../model/Sofa.cjs");
const Armchair = require("../model/Armchair.cjs");
const Chair = require("../model/Chair.cjs");
const Table = require("../model/Table.cjs");
const Lamp = require("../model/Lamp.cjs");

router.get("/:category", async (req, res, next) => {
  const { category } = req.params;
  let items;

  try {
    switch (category) {
      case "sofy":
        items = await Sofa.find();
        break;
      case "fotele":
        items = await Armchair.find();
        break;
      case "krzesła":
        items = await Chair.find();
        break;
      case "stoły":
        items = await Table.find();
        break;
      case "lampy":
        items = await Lamp.find();
        break;
      default:
        throw { status: 400, message: "Invalid category" };
    }

    res.json(items);
  } catch (error) {
    console.error("Error fetching items:", error);
    next(error);
  }
});

module.exports = router;
