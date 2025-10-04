// src/utils/imageResolver.js
// Purpose: map recipe/ingredient ids to imported assets so Vite bundles them.

import boiledRice from "../assets/recipes/boiled_rice.jpeg";
import dalTadka from "../assets/recipes/dal_tadka.webp";
import vegBiryani from "../assets/recipes/veg-biryani.jpeg";
import defaultRecipe from "../assets/recipes/default.png";

import chilliPowder from "../assets/ingredients/chilli.jpg";
import masoorDal from "../assets/ingredients/masoor.jpeg";
import rice from "../assets/ingredients/rice.jpeg";
import turmeric from "../assets/ingredients/turmeric.jpeg";
import salt from "../assets/ingredients/salt.jpg";
import defaultIngredient from "../assets/ingredients/default2.png";

// Map recipe IDs (must match recipe JSON "id")
export const recipeImages = {
  r1: boiledRice,
  r2: dalTadka,
  r3: vegBiryani,
  // add more if you have
};

// Default fallback if no recipe image found
export const recipeDefaultImage = defaultRecipe;

// Map ingredient IDs (must match ingredient JSON "id")
export const ingredientImages = {
  ing1: rice,
  ing2: turmeric,
  ing3: chilliPowder,
  ing4: masoorDal,
  ing5: salt,
  // add more if needed
};

// Default fallback if no ingredient image found
export const ingredientDefaultImage = defaultIngredient;
