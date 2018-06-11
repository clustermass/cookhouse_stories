import { getAllRecipes } from '../util/recipe_utils'


export const IMPORT_RECIPES = "IMPORT_RECIPES"


export const importAllRecipes = () => dispatch =>(
  getAllRecipes().then(object => dispatch({type:IMPORT_RECIPES, object:object }) )
)
