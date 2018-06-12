import { getAllRecipes, getRecipe } from '../util/recipe_utils'


export const IMPORT_RECIPES = "IMPORT_RECIPES"
export const IMPORT_SINGLE_RECIPE = "IMPORT_SINGLE_RECIPE"


export const importAllRecipes = () => dispatch =>(
  getAllRecipes().then(object => dispatch({type:IMPORT_RECIPES, object:object }) )
)

export const importRecipe = (id) => dispatch =>(
  getRecipe(id).then(object => dispatch({type:IMPORT_SINGLE_RECIPE, object:object }) )
)
