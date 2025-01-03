import React from "react"
import IngredientsList from "./IngredientsList"
import ClaudeRecipe from "./ClaudeRecipe"


export default function Main (){


  const [ingredients, setIngredients] = React.useState(["Chicken", "Pasta", "Potato"])

  const [recipeShown, setRecipeShown] = React.useState(false)
    
    function toggleRecipeShown() {
        setRecipeShown(prevShown => !prevShown)
    }

  
  function addIngredient(formData){

    const newIngredient = formData.get("ingredient")
    setIngredients(prevIngredients => [...prevIngredients, newIngredient])

  }


  return (
    <>
    <main>
      <form action={addIngredient} className="add-ingredient-form">
      <input 
          type="text" 
          placeholder="eg. Rice, Chicken" 
          name="ingredient"
          />
      <button>Add Ingredients</button>
      </form>
      
      {ingredients.length > 0 && <IngredientsList  
            ingredients={ingredients} 
            toggleRecipeShown={toggleRecipeShown}
            />}

      {recipeShown && <ClaudeRecipe />}

    </main>
    </>
  )

}