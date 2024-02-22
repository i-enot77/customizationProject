const Sofa = require("../model/Sofa.cjs");
const Armchair = require("../model/Armchair.cjs");
const Chair = require("../model/Chair.cjs");
const Table = require("../model/Table.cjs");
const Lamp = require("../model/Lamp.cjs");

const getSofaItems = async (req, res) => {
  try {
    const sofa = await Sofa.find()
      .populate("baseMaterial")
      .populate("legsMaterial");

    res.json(sofa);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getArmchairItems = async (req, res) => {
  try {
    const armchair = await Armchair.find()
      .populate("baseMaterial")
      .populate("legsMaterial");
    res.json(armchair);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getChairItems = async (req, res) => {
  try {
    const chair = await Chair.find()
      .populate("baseMaterial")
      .populate("legsMaterial");
    res.json(chair);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getTableItems = async (req, res) => {
  try {
    const table = await Table.find()
      .populate("baseMaterial")
      .populate("legsMaterial");
    res.json(table);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getLampItems = async (req, res) => {
  try {
    const lamp = await Lamp.find().populate("baseMaterial");

    res.json(lamp);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getSofaItems,
  getArmchairItems,
  getChairItems,
  getTableItems,
  getLampItems,
};
