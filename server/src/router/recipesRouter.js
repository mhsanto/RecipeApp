import { RecipeModel } from "../models/Recipe.js";
import express from "express";
import { UserModel } from "../models/Users.js";
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const response = await RecipeModel.find({});
    res.json(response);
  } catch (error) {
    res.json(error);
  }
});
// post recipe
router.post("/", async (req, res) => {
  try {
    const recipe = new RecipeModel(req.body);
    const response = await recipe.save();
    res.json(response);
  } catch (error) {
    res.json(error);
  }
});
// Put recipe

router.put("/", async (req, res) => {
  try {
    const recipeID = await RecipeModel.findById(req.body.recipeID);
    const userID = await UserModel.findById(req.body.userID);
    userID.savedRecipe.push(recipeID);
    await userID.save();
    res.json({ savedRecipe: userID.savedRecipe });
    res.json(response);
  } catch (error) {
    res.json(error);
  }
});

router.get("/savedRecipes/ids", async (req, res) => {
  try {
    const user = await UserModel.findById(req.body.userID);
    res.json({ savedRecipe: user?.savedRecipe });
  } catch (error) {
    res.json(error);
  }
});
router.get("/savedRecipes", async (req, res) => {
  try {
    const user = await UserModel.findById(req.body.userID);
    const savedRecipes = await RecipeModel.find({
      _id: { $in: user.savedRecipe },
    });
    res.json({ savedRecipe: user?.savedRecipe });
  } catch (error) {
    res.json(error);
  }
});

export { router as RecipeRouter };
