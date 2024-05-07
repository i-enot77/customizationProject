const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const Material = require("../model/Material.cjs");

router.post("/materials", async (req, res) => {
  const { materialIds } = req.body; // Extract materialIds from the request body

  try {
    if (!materialIds || !Array.isArray(materialIds)) {
      return res
        .status(400)
        .json({ message: "Invalid or missing materialIds" });
    }

    // Find materials by IDs in the database
    const materials = await Material.find({ _id: { $in: materialIds } });
    console.log(materials);
    res.json({ materials });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
