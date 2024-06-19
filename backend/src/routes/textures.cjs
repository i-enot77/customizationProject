const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const Material = require("../model/Material.cjs");

router.post("/textures", async (req, res) => {
  const materialIdsString = req.body.materialIds;

  try {
    if (!materialIdsString) {
      return res
        .status(400)
        .json({ message: "Invalid or missing materialIds" });
    }
    const materialIdsArray = materialIdsString.split(",");

    const materials = await Material.find({ _id: { $in: materialIdsArray } });
    console.log(materials);
    res.json(materials);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
