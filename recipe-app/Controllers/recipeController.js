const Recipe = require("../models/Recipe");


const createRecipe = async (req, res) => {
  try {
    const recipe = new Recipe(req.body);
    await recipe.save();
    res.status(201).json(recipe);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


const getAllRecipes = async (req, res) => {
  try {
    const { page = 1, pageSize = 10 } = req.query;
    const limit = parseInt(pageSize);
    const skip = (parseInt(page) - 1) * limit;

    const recipes = await Recipe.find().skip(skip).limit(limit);
    const total = await Recipe.countDocuments();

    res.status(200).json({
      total,
      page: parseInt(page),
      pageSize: limit,
      recipes,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });
    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json({ message: error.message });
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
    res.status(400).json({ message: error.message });
  }
};


const deleteRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndDelete(req.params.id);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });
    res.status(200).json({ message: "Recipe deleted successfully"});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
    createRecipe,
    getAllRecipes,
    getRecipeById,
    updateRecipeById,
    deleteRecipeById,
}