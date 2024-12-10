const express = require("express");
const { authenticate, authorize } = require("../middleware/authMiddleware");
const {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipeById,
  deleteRecipeById,
} = require("../Controllers/recipeController");

const router = express.Router();

router.post("/recipes", authenticate, authorize(["admin"]), createRecipe);
router.get("/recipes", getAllRecipes);
router.get("/recipes/:id", getRecipeById);
router.put("/recipes/:id", authenticate, authorize(["admin"]), updateRecipeById);
router.delete("/recipes/:id", authenticate, authorize(["admin"]), deleteRecipeById);

module.exports = router;