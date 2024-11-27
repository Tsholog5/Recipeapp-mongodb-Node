const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  ingredients: {
    type: [String],
    required: [true, "Ingredients are required"],
  },
  directions: {
    type: String,
    required: [true, "Directions are required"],
  },
  category: {
    type: String,
    required: [true, "Category is required"],
  },
  prepTime: {
    type: Number,
    required: [true, "Preparation time is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('recipe', recipeSchema);