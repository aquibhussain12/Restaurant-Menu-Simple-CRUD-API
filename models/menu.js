const mongoose = require("mongoose");

const MenuSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
  },
  RecipeName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Menu", MenuSchema, "Menu");
