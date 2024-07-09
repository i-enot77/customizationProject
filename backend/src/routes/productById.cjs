const express = require("express");
const { query, validationResult } = require("express-validator");
const mongoose = require("mongoose");
const router = express.Router();
const Sofa = require("../model/Sofa.cjs");
const Armchair = require("../model/Armchair.cjs");
const Chair = require("../model/Chair.cjs");
const Table = require("../model/Table.cjs");
const Lamp = require("../model/Lamp.cjs");
const Material = require("../model/Material.cjs");

router.get(
  "/:category/:id",
  [
    query("base")
      .isString()
      .notEmpty()
      .withMessage("Base material is required and should be a string"),
    query("legs")
      .isString()
      .optional()
      .withMessage("Legs material should be a string if provided"),
  ],
  async (req, res) => {
    // Validate the query parameters
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { category, id } = req.params;
    const baseMaterial = req.query.base;
    const legsMaterial = req.query.legs ? req.query.legs : null;

    console.log(req.params, req.query); // Logging for debugging
    console.log(baseMaterial, legsMaterial); // Logging for debugging

    try {
      let product, baseMtl, legsMtl;

      switch (category) {
        case "sofy":
          product = await Sofa.findById(id);
          baseMtl = await Material.findById(baseMaterial);
          legsMtl = legsMaterial ? await Material.findById(legsMaterial) : null;
          break;
        case "fotele":
          product = await Armchair.findById(id);
          baseMtl = await Material.findById(baseMaterial);
          legsMtl = legsMaterial ? await Material.findById(legsMaterial) : null;
          break;
        case "krzesła":
          product = await Chair.findById(id);
          baseMtl = await Material.findById(baseMaterial);
          legsMtl = legsMaterial ? await Material.findById(legsMaterial) : null;
          break;
        case "stoły":
          product = await Table.findById(id);
          baseMtl = await Material.findById(baseMaterial);
          legsMtl = legsMaterial ? await Material.findById(legsMaterial) : null;
          break;
        case "lampy":
          product = await Lamp.findById(id);
          baseMtl = await Material.findById(baseMaterial);
          break;
        default:
          return res.status(400).json({ message: "Invalid category" });
      }

      if (!product) {
        console.log("Product not found");
        return res.status(404).json({ message: "Product not found" });
      }

      if (!baseMtl) {
        console.log("Base not found");
        return res.status(404).json({ message: "Base material not found" });
      }

      if (category !== "lampy" && legsMaterial && !legsMtl) {
        return res.status(404).json({ message: "Legs material not found" });
      }
      console.log({ product, baseMtl, legsMtl });
      return res.status(200).json({ product, baseMtl, legsMtl });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

module.exports = router;
