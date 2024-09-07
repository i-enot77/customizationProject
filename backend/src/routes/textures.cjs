const express = require("express");
const router = express.Router();

const Material = require("../model/Material.cjs");

router.post("/textures", async (req, res) => {
  const materialIdsString = req.body.materialIds;

  try {
    if (!materialIdsString) {
      throw { status: 400, message: "Invalid or missing materialIds" };
    }
    const materialIdsArray = materialIdsString.split(",");

    const materials = await Material.find({ _id: { $in: materialIdsArray } });
    console.log(materials);
    res.json(materials);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
