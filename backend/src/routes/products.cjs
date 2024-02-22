const express = require("express");
const router = express.Router();

const productsController = require("../controllers/productsController.cjs");

router.get("/sofa", productsController.getSofaItems);
router.get("/armchair", productsController.getArmchairItems);
router.get("/chair", productsController.getChairItems);
router.get("/table", productsController.getTableItems);
router.get("/lamp", productsController.getLampItems);

module.exports = router;
