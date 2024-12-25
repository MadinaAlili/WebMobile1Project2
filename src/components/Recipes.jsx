import React, { useEffect, useState } from "react";
import Recipe from "./Recipe";
import RecipeForm from "./RecipeForm";
import { getRecipes } from "../api/recipeApi";
import "../styles/Recipes.css";

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedRecipes, setSelectedRecipes] = useState([]);


  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const data = await getRecipes();
        setRecipes(data);
      } catch (error) {
        console.error("Failed to fetch recipes:", error);
      }
    };

    fetchRecipes();
  }, []);


  
  const handleRecipeAdded = (newRecipe) => {
    setRecipes((prevRecipes) => [newRecipe, ...prevRecipes]);
    setShowForm(false);
  };

  const handleRecipeUpdated = (id, updatedRecipe) => {
    setRecipes((prevRecipes) =>
      prevRecipes.map((recipe) => (recipe.id === id ? updatedRecipe : recipe))
    );
  };

  const handleRecipeDeleted = (id) => {
    setRecipes((prevRecipes) => prevRecipes.filter((recipe) => recipe.id !== id));
  };

  return (
    <div className="recipes-container">
      <div className="header">
        <h1 className="title">All Recipes</h1>
        <button onClick={() => setShowForm(!showForm)} className="add-recipe-button">
          {showForm ? "Close" : "Add Recipe"}
        </button>
      </div>

      {showForm && <RecipeForm onRecipeAdded={handleRecipeAdded} />}

      <div className="recipes-grid">
        {recipes.map((recipe) => (
          <Recipe
            key={recipe.id}
            recipe={recipe}
            onUpdate={handleRecipeUpdated}
            onDelete={handleRecipeDeleted}
          />
        ))}
      </div>
    </div>
  );
};

export default Recipes;