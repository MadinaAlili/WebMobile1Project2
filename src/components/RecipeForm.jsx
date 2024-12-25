import React, { useState } from "react";
import { addRecipe } from "../api/recipeApi";
import "../styles/RecipeForm.css";

const RecipeForm = ({ onRecipeAdded }) => {
  const [recipe, setRecipe] = useState({
    title: "",
    description: "",
    ingredients: "",
    preparationSteps: "",
    tags: "",
    difficulty: "Easy",
    bannerImage: "",
    lastUpdated: new Date().toISOString(),
  });

  const handleChange = (e) => {
    setRecipe({
      ...recipe,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedRecipe = {
        ...recipe,
        ingredients: recipe.ingredients.split(",").map((item) => item.trim()),
        preparationSteps: recipe.preparationSteps
          .split(",")
          .map((item) => item.trim()),
        tags: recipe.tags.split(",").map((item) => item.trim()),
        lastUpdated: new Date().toISOString(),
      };

      await addRecipe(updatedRecipe);
      alert("Recipe added successfully!");
      onRecipeAdded(updatedRecipe);
      setRecipe({
        title: "",
        description: "",
        ingredients: "",
        preparationSteps: "",
        tags: "",
        difficulty: "Easy",
        bannerImage: "",
        lastUpdated: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Failed to add recipe:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="recipe-form">
      <h2 className="form-title">Add a New Recipe</h2>
      <input
        type="text"
        name="title"
        placeholder="Recipe Title"
        value={recipe.title}
        onChange={handleChange}
        required
        className="form-input"
      />
      <textarea
        name="description"
        placeholder="Description"
        value={recipe.description}
        onChange={handleChange}
        required
        className="form-input"
      />
      <textarea
        name="ingredients"
        placeholder="Ingredients (comma-separated)"
        value={recipe.ingredients}
        onChange={handleChange}
        className="form-input"
      />
      <textarea
        name="preparationSteps"
        placeholder="Preparation Steps (comma-separated)"
        value={recipe.preparationSteps}
        onChange={handleChange}
        className="form-input"
      />
      <input
        type="text"
        name="tags"
        placeholder="Tags (comma-separated)"
        value={recipe.tags}
        onChange={handleChange}
        className="form-input"
      />
      <select
        name="difficulty"
        value={recipe.difficulty}
        onChange={handleChange}
        className="form-input"
      >
        <option value="Easy">Easy</option>
        <option value="Medium">Medium</option>
        <option value="Hard">Hard</option>
      </select>
      <input
        type="text"
        name="bannerImage"
        placeholder="Image URL"
        value={recipe.bannerImage}
        onChange={handleChange}
        className="form-input"
      />
      <button type="submit" className="form-button">
        Save Recipe
      </button>
    </form>
  );
};

export default RecipeForm;