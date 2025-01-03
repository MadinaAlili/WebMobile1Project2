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
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTag, setFilterTag] = useState("");
  const [filterDifficulty, setFilterDifficulty] = useState("");
  const [sortOption, setSortOption] = useState("");

  useEffect(() => {
    const fetchInitialRecipes = async () => {
      try {
        setIsLoading(true);
        const { recipes: initialRecipes, total } = await getRecipes(1, 6);
        setRecipes(initialRecipes);
        setTotalRecipes(total);
        setCurrentPage(1);
      } catch (error) {
        console.error("failed", error);
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
      console.error("pagianation failed:", error);
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

  useEffect(() => {
    fetch("http://localhost:3001/recipes")
      .then((response) => response.json())
      .then((data) => setRecipes(data));
  }, []);

  const filteredRecipes = recipes
    .filter((recipe) => {

      const matchesSearch =
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.ingredients.some((ingredient) =>
          ingredient.toLowerCase().includes(searchTerm.toLowerCase())
        );
      return matchesSearch;
    })

    .filter((recipe) => {
      if (filterTag) {
        return (
          recipe.tags &&
          Array.isArray(recipe.tags) &&
          recipe.tags.some((tag) => tag.toLowerCase() === filterTag.toLowerCase())
        );
      }
      return true;
    })
    
    
    .filter((recipe) => {

      if (filterDifficulty) {
        return recipe.difficulty && recipe.difficulty.toLowerCase() === filterDifficulty.toLowerCase();
      }
      return true;
    })

    .sort((a, b) => {

      if (sortOption === "title") return a.title.localeCompare(b.title);
      if (sortOption === "createTime") return new Date(a.createTime) - new Date(b.createTime);
      if (sortOption === "lastUpdated") return new Date(b.lastUpdated) - new Date(a.lastUpdated);
      if (sortOption === "difficulty") return a.difficulty.localeCompare(b.difficulty);
      return 0;
    });


  return (
    <div className="recipes-container">
      <div className="controls-container">
        <input
          type="text"
          className="search-bar"
          placeholder="Search recipes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          value={filterTag}
          className="filter-dropdown"
          onChange={(e) => setFilterTag(e.target.value)}
        >
          <option value="">All Tags</option>
          <option value="vegan">Vegan</option>
          <option value="vegetarian">Vegetarian</option>
          <option value="quick">Quick Meal</option>
          <option value="dessert">Dessert</option>
          <option value="dinner">Dinner</option>
          <option value="traditional">Traditional</option>
          <option value="appetizer">Appetizer</option>
          <option value="soup">Soup</option>
          <option value="barbecue">Barbecue</option>


        </select>

        <select
          value={filterDifficulty}
          className="filter-dropdown"
          onChange={(e) => setFilterDifficulty(e.target.value)}
        >
          <option value="">All Difficulty Levels</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>

        <select
          value={sortOption}
          className="sort-dropdown"
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="lastUpdated">Last Updated</option>
          <option value="title">Title</option>
          <option value="createTime">Create Time</option>
          <option value="difficulty">Difficulty</option>
        </select>
      </div>

      
      {searchTerm.trim() === "" ? (
        <p className="no-search-message">Start typing to search for recipes...</p>
      ) : filteredRecipes.length > 0 ? (
        <ul className="recipe-list">
          {filteredRecipes.map((recipe) => (
            <li key={recipe.id} className="recipe-item">
              <h2>{recipe.title}</h2>
              <p><strong>Description:</strong> {recipe.description}</p>
              <p><strong>Ingredients:</strong> {recipe.ingredients.join(", ")}</p>
              <p><strong>Difficulty:</strong> {recipe.difficulty}</p>
              <p><strong>Tags:</strong> {recipe.tags.join(", ")}</p>
              <p><strong>Last Updated:</strong> {new Date(recipe.lastUpdated).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-recipes-message">No recipes match your search.</p>
      )}



      <div className="header">
        <h1 className="title">All Recipes</h1>
        <div className="action-buttons">
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