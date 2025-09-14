import Combo from "../models/combo.models.js";

export const createCombo = async (req, res) => {
  try {
    const { name, description, books, price, stock, imageUrl } = req.body;
    if (!name || price == null) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const combo = new Combo({
      name,
      description,
      books,
      price,
      stock,
      imageUrl,
    });
    const saved = await combo.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllCombos = async (req, res) => {
  try {
    const combos = await Combo.find().sort({ createdAt: -1 });
    res.json(combos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getComboById = async (req, res) => {
  try {
    const combo = await Combo.findById(req.params.id);
    if (!combo) return res.status(404).json({ message: "Combo not found" });
    res.json(combo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateCombo = async (req, res) => {
  try {
    const updated = await Combo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ message: "Combo not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteCombo = async (req, res) => {
  try {
    const deleted = await Combo.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Combo not found" });
    res.json({ message: "Combo deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
