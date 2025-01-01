import React, { useEffect, useState } from "react";
import { getRecipes } from "../api/recipeApi";
import "../styles/Recipes.css";
import RecipeForm from "../components/RecipeForm";
import Recipe from "../components/Recipe";

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [totalRecipes, setTotalRecipes] = useState(0);
  const [selectedRecipes, setSelectedRecipes] = useState([]);

  useEffect(() => {
    const fetchInitialRecipes = async () => {
      try {
        setIsLoading(true);
        const { recipes: initialRecipes, total } = await getRecipes(1, 6);
        setRecipes(initialRecipes);
        setTotalRecipes(total);
        setCurrentPage(1);
      } catch (error) {
        console.error("Failed to fetch recipes:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialRecipes();
  }, []);

  const fetchMoreRecipes = async () => {
    try {
      setIsLoading(true);
      const { recipes: moreRecipes } = await getRecipes(currentPage + 1, 10);
      setRecipes((prevRecipes) => {
        const newRecipes = moreRecipes.filter(
          (newRecipe) => !prevRecipes.some((recipe) => recipe.id === newRecipe.id)
        );
        return [...prevRecipes, ...newRecipes];
      });
      setCurrentPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error("Failed to fetch more recipes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRecipeSelection = (id) => {
    setSelectedRecipes((prevSelected) =>
      prevSelected.includes(id) ? prevSelected.filter((recipeId) => recipeId !== id) : [...prevSelected, id]
    );
  };

  const handleShare = () => {
    const selectedRecipeDetails = recipes.filter((recipe) =>
      selectedRecipes.includes(recipe.id)
    );

    if (selectedRecipeDetails.length === 0) {
      alert("No recipes selected for sharing.");
      return;
    }

    const emailBody = JSON.stringify(selectedRecipeDetails, null, 2);
    const subject = `Shared Recipes (${selectedRecipeDetails.length} recipes)`;

    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
  };

  return (
    <div className="recipes-container">
      <div className="header">
        <h1 className="title">All Recipes</h1>
        <div>
          <button onClick={() => setShowForm(!showForm)} className="add-recipe-button">
            {showForm ? "Close" : "Add Recipe"}
          </button>
          <button
            onClick={handleShare}
            disabled={selectedRecipes.length === 0}
            className="share-button"
          >
            Share Selected Recipes
          </button>
        </div>
      </div>

      {showForm && <RecipeForm />}

      <div className="recipes-grid">
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <Recipe
              key={recipe.id}
              recipe={recipe}
              isSelected={selectedRecipes.includes(recipe.id)}
              onSelect={() => handleRecipeSelection(recipe.id)}
            />
          ))
        ) : (
          <p>No recipes available.</p>
        )}
      </div>

      <div className="load-more-container">
        <button
          onClick={fetchMoreRecipes}
          disabled={isLoading || recipes.length >= totalRecipes}
          className="load-more-button"
        >
          {isLoading ? "Loading..." : recipes.length >= totalRecipes ? "No More Recipes" : "Load More"}
        </button>
      </div>
    </div>
  );
};

export default Recipes;