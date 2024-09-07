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
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { category, id } = req.params;
    const baseMaterial = req.query.base;
    const legsMaterial = req.query.legs || null;

    try {
      let productModel;
      switch (category) {
        case "sofy":
          productModel = Sofa;
          break;
        case "fotele":
          productModel = Armchair;
          break;
        case "krzesła":
          productModel = Chair;
          break;
        case "stoły":
          productModel = Table;
          break;
        case "lampy":
          productModel = Lamp;
          break;
        default:
          throw { status: 400, message: "Invalid category" };
      }

      const product = await productModel.findById(id);
      if (!product) {
        throw { status: 404, message: "Product not found" };
      }

      const baseMtl = await Material.findById(baseMaterial);
      if (!baseMtl) {
        throw { status: 404, message: "Base material not found" };
      }

      let legsMtl = null;
      if (legsMaterial) {
        legsMtl = await Material.findById(legsMaterial);
        if (!legsMtl) {
          throw { status: 404, message: "Legs material not found" };
        }
      }

      return res.status(200).json({ product, baseMtl, legsMtl });
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
