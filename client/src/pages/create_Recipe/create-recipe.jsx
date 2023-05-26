import { useState } from "react";
import "./createRecipe.css";
import axios from "axios";
import useGetUserID from "../../hooks/useUserId";
import { useNavigate } from "react-router-dom";
const CreateRecipe = () => {
  const userID = useGetUserID();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState({
    name: "",
    description: "",
    ingredients: [],
    instructions: "",
    imageUrl: "",
    cookingTime: 0,
    userOwner: userID,
  });
  const handleIngredientsChange = (event, index) => {
    const { value } = event.target;
    const ingredients = [...recipe.ingredients];
    ingredients[index] = value;
    setRecipe({ ...recipe, ingredients });
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setRecipe({ ...recipe, [name]: value });
  };
  const handleIngredients = () => {
    const ingredients = [...recipe.ingredients, ""];
    setRecipe({ ...recipe, ingredients });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:3001/recipes", { ...recipe });
      alert("Recipe created successfully");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="createRecipe">
      <h1>Create Your Recipe</h1>
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input type="text" name="name" id="name" onChange={handleChange} />
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={recipe.description}
          onChange={handleChange}
        ></textarea>
        <label htmlFor="ingredients">Ingredients</label>
        {recipe.ingredients.map((ingredient, index) => (
          <input
            key={index}
            type="text"
            value={ingredient}
            name="ingredients"
            onChange={(event) => handleIngredientsChange(event, index)}
          />
        ))}
        <button type="button" onClick={handleIngredients}>
          Add Ingredients
        </button>
        <label htmlFor="instructions">Instructions</label>
        <textarea
          id="instructions"
          name="instructions"
          value={recipe.instructions}
          onChange={handleChange}
        ></textarea>
        <label htmlFor="imageUrl">Image URL</label>
        <input type="text" name="imageUrl" onChange={handleChange} />
        <label htmlFor="cookingTime">Cooking Time</label>
        <input
          type="number"
          name="cookingTime"
          id="cookingTime"
          onChange={handleChange}
        />
        <button type="submit">Create Recipe</button>
      </form>
    </div>
  );
};

export default CreateRecipe;
