const Recipe = require("../models/Recipe");

const createRecipe = async (req, res) => {
  try {
    
    const { title, ingredients, instructions } = req.body;
    if (!title || !ingredients || !instructions) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const recipe = new Recipe(req.body);
    await recipe.save();
    res.status(201).json(recipe);
  } catch (error) {
    console.error("Error creating recipe:", error.message);
    res.status(400).json({ message: "Failed to create recipe. Please try again." });
  }
};

const getAllRecipes = async (req, res) => {
  try {
    const { page = 1, pageSize = 10 } = req.query;
    const limit = Math.min(parseInt(pageSize), 50); 
    const skip = (parseInt(page) - 1) * limit;

    const recipes = await Recipe.find().skip(skip).limit(limit);
    const total = await Recipe.countDocuments();

    if (recipes.length === 0) {
      return res.status(200).json({ message: "No recipes found", recipes: [] });
    }

    res.status(200).json({
      total,
      page: parseInt(page),
      pageSize: limit,
      recipes,
    });
  } catch (error) {
    console.error("Error fetching recipes:", error.message);
    res.status(500).json({ message: "Failed to fetch recipes. Please try again." });
  }
};

const getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });
    res.status(200).json(recipe);
  } catch (error) {
    console.error("Error fetching recipe by ID:", error.message);
    res.status(500).json({ message: "Failed to fetch recipe. Please try again." });
  }
};

const updateRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });
    res.status(200).json(recipe);
  } catch (error) {
    console.error("Error updating recipe:", error.message);
    res.status(400).json({ message: "Failed to update recipe. Please try again." });
  }
};

const deleteRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndDelete(req.params.id);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });
    res.status(200).json({ message: "Recipe deleted successfully" });
  } catch (error) {
    console.error("Error deleting recipe:", error.message);
    res.status(500).json({ message: "Failed to delete recipe. Please try again." });
  }
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipeById,
  deleteRecipeById,
};
