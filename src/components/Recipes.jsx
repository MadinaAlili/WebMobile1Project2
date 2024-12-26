import React, { useEffect, useState } from "react";
import Recipe from "./Recipe";
import RecipeForm from "./RecipeForm";
import { getRecipes } from "../api/recipeApi";
import "../styles/Recipes.css";

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [totalRecipes, setTotalRecipes] = useState(0);

  useEffect(() => {
    const fetchInitialRecipes = async () => {
      try {
        setIsLoading(true);
        const { recipes: initialRecipes, total } = await getRecipes(1, 2);
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

  return (
    <div className="recipes-container">
      <div className="header">
        <h1 className="title">All Recipes</h1>
        <button onClick={() => setShowForm(!showForm)} className="add-recipe-button">
          {showForm ? "Close" : "Add Recipe"}
        </button>
      </div>

      {showForm && <RecipeForm />}

      <div className="recipes-grid">
        {recipes.length > 0 ? (
          recipes.map((recipe) => <Recipe key={recipe.id} recipe={recipe} />)
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