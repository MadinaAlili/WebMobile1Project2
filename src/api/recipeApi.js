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