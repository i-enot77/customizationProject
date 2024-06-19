const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Sofa = require("../model/Sofa.cjs");
const Armchair = require("../model/Armchair.cjs");
const Chair = require("../model/Chair.cjs");
const Table = require("../model/Table.cjs");
const Lamp = require("../model/Lamp.cjs");
const Material = require("../model/Material.cjs");

router.get("/:category/:id/:baseMaterial/:legsMaterial", async (req, res) => {
  const { category, id, baseMaterial, legsMaterial } = req.params;
  console.log(req.params);

  try {
    let product, baseMtl, legsMtl;

    switch (category) {
      case "sofy":
        product = await Sofa.findById(id);
        baseMtl = await Material.findById(baseMaterial);
        legsMtl = await Material.findById(legsMaterial);
        break;
      case "fotele":
        product = await Armchair.findById(id)
          .populate(baseMaterial ? "baseMaterial" : "")
          .populate(legsMaterial ? "legsMaterial" : "");
        baseMtl = product ? product.baseMaterial : null;
        legsMtl = product ? product.legsMaterial : null;
        break;
      case "krzesła":
        product = await Chair.findById(id)
          .populate(baseMaterial ? "baseMaterial" : "")
          .populate(legsMaterial ? "legsMaterial" : "");
        baseMtl = product ? product.baseMaterial : null;
        legsMtl = product ? product.legsMaterial : null;
        break;
      case "stoły":
        product = await Table.findById(id)
          .populate(baseMaterial ? "baseMaterial" : "")
          .populate(legsMaterial ? "legsMaterial" : "");
        baseMtl = product ? product.baseMaterial : null;
        legsMtl = product ? product.legsMaterial : null;
        break;
      case "lampy":
        product = await Lamp.findById(id).populate(
          baseMaterial ? "baseMaterial" : ""
        );
        baseMtl = product ? product.baseMaterial : null;
        break;
      default:
        return res.status(400).json({ message: "Invalid category" });
    }

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (!baseMtl) {
      return res.status(404).json({ message: "Base material not found" });
    }

    if (category !== "lampy" && !legsMtl) {
      return res.status(404).json({ message: "Legs material not found" });
    }

    // Only return product, baseMtl, and legsMtl if all are defined
    return res.status(200).json({ product, baseMtl, legsMtl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// router.get("/materials", async (req, res) => {
//   const { materialIds } = req.query; // Extract materialIds from the query parameters

//   try {
//     if (!materialIds || !Array.isArray(materialIds)) {
//       return res
//         .status(400)
//         .json({ message: "Invalid or missing materialIds" });
//     }

//     // Find materials by IDs in the database
//     const materials = await Material.find({ _id: { $in: materialIds } });

//     res.json({ materials });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });

module.exports = router;
