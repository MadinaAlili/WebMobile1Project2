import React, { useState } from "react";
import { deleteRecipe, updateRecipe } from "../api/recipeApi";
import "../styles/Recipe.css";

const Recipe = ({ recipe, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedRecipe, setEditedRecipe] = useState({ ...recipe });

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedRecipe({ ...editedRecipe, [name]: value });
  };

  const handleArrayInputChange = (e, field) => {
    const value = e.target.value.split(",").map((item) => item.trim());
    setEditedRecipe({ ...editedRecipe, [field]: value });
  };

  const handleUpdate = async () => {
    try {
      const updatedRecipe = {
        ...editedRecipe,
        lastUpdated: new Date().toISOString(),
      };
      await updateRecipe(recipe.id, updatedRecipe);
      onUpdate(recipe.id, updatedRecipe);
      alert("Recipe updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update recipe:", error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this recipe?")) {
      try {
        await deleteRecipe(recipe.id);
        onDelete(recipe.id);
        alert("Recipe deleted successfully!");
      } catch (error) {
        console.error("Failed to delete recipe:", error);
      }
    }
  };

  

  return (
    <div className="recipe-card">
      {isEditing ? (
        <div className="recipe-edit-form">
          
          <input
            type="text"
            name="title"
            value={editedRecipe.title}
            onChange={handleInputChange}
            placeholder="Recipe Title"
            className="form-input"
          />
          <textarea
            name="description"
            value={editedRecipe.description}
            onChange={handleInputChange}
            placeholder="Description"
            className="form-input"
          />
          <textarea
            name="ingredients"
            value={editedRecipe.ingredients.join(", ")}
            onChange={(e) => handleArrayInputChange(e, "ingredients")}
            placeholder="Ingredients (comma-separated)"
            className="form-input"
          />
          <textarea
            name="preparationSteps"
            value={editedRecipe.preparationSteps.join(", ")}
            onChange={(e) => handleArrayInputChange(e, "preparationSteps")}
            placeholder="Preparation Steps (comma-separated)"
            className="form-input"
          />
          <input
            type="text"
            name="tags"
            value={editedRecipe.tags.join(", ")}
            onChange={(e) => handleArrayInputChange(e, "tags")}
            placeholder="Tags (comma-separated)"
            className="form-input"
          />
          <select
            name="difficulty"
            value={editedRecipe.difficulty}
            onChange={handleInputChange}
            className="form-input"
          >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
          <div className="form-buttons">
            <button onClick={handleUpdate} className="button save-button">
              Save
            </button>
            <button onClick={handleEditToggle} className="button cancel-button">
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
        
          <img src={recipe.bannerImage} alt={recipe.title} className="recipe-image" />
          <h3 className="recipe-title">{recipe.title}</h3>
          <p className="recipe-description">{recipe.description}</p>

          <div className="recipe-section">
            <h4>Ingredients:</h4>
            <ul className="recipe-list">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>

          <div className="recipe-section">
            <h4>Preparation Steps:</h4>
            <ol className="recipe-list">
              {recipe.preparationSteps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </div>

          <div className="recipe-section">
            <h4>Tags:</h4>
            <div className="recipe-tags">
              {recipe.tags.map((tag, index) => (
                <span key={index} className="tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <p className="recipe-difficulty">
            Difficulty: <span>{recipe.difficulty}</span>
          </p>
          <p className="recipe-updated">
            Last Updated: {new Date(recipe.lastUpdated).toLocaleString()}
          </p>

          <div className="recipe-buttons">
            <button onClick={handleEditToggle} className="button edit-button">
              Edit
            </button>
            <button onClick={handleDelete} className="button delete-button">
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Recipe;