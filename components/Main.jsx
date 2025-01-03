import React from "react";
import IngredientsList from "./IngredientsList";
import ClaudeRecipe from "./ClaudeRecipe";
import { getRecipeFromMistral } from "../api"; // Import the utility function

export default function Main() {
  const [ingredients, setIngredients] = React.useState(["Chicken", "Pasta", "Potato"]);
  const [recipe, setRecipe] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  async function fetchRecipe() {
    setLoading(true);
    setError("");

    try {
      const recipeResponse = await getRecipeFromMistral(ingredients);
      setRecipe(recipeResponse);
    } catch (err) {
      setError("Failed to fetch recipe. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  function addIngredient(formData) {
    const newIngredient = formData.get("ingredient");
    setIngredients((prevIngredients) => [...prevIngredients, newIngredient]);
  }

  return (
    <>
      <main>
        <form action={addIngredient} className="add-ingredient-form">
          <input type="text" placeholder="eg. Rice, Chicken" name="ingredient" />
          <button>Add Ingredients</button>
        </form>

        {ingredients.length > 0 && (
          <IngredientsList ingredients={ingredients} fetchRecipe={fetchRecipe} />
        )}

        {loading && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {recipe && <ClaudeRecipe recipe={recipe} />}
      </main>
    </>
  );
}
