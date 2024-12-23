const API_URL = "http://localhost:3001/recipes";

export const getRecipes = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Failed to fetch recipes");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching recipes:", error);
    throw error;
  }
};

export const getRecipeById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch the recipe");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching the recipe:", error);
    throw error;
  }
};


export const updateRecipe = async (id, updatedRecipe) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedRecipe),
    });
    if (!response.ok) {
      throw new Error("Failed to update the recipe");
    }
    return await response.json();
  } catch (error) {
    console.error("Error updating recipe:", error);
    throw error;
  }
};

export const deleteRecipe = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete the recipe");
    }
    return await response.json();
  } catch (error) {
    console.error("Error deleting recipe:", error);
    throw error;
  }
};


export const addRecipe = async (recipe) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recipe),
    });
    if (!response.ok) {
      throw new Error("Failed to add the recipe");
    }
    return await response.json();
  } catch (error) {
    console.error("Error adding recipe:", error);
    throw error;
  }
};