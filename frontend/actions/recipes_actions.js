import { getAllRecipes, getRecipe, postLikeRecipe } from '../util/recipe_utils'
import { addErrors } from './errors_actions'

export const IMPORT_RECIPES = "IMPORT_RECIPES"
export const IMPORT_SINGLE_RECIPE = "IMPORT_SINGLE_RECIPE"


export const importAllRecipes = () => dispatch =>(
  getAllRecipes().then(object => dispatch({type:IMPORT_RECIPES, object:object }) )
)

export const importRecipe = (id) => dispatch =>(
  getRecipe(id).then(object => dispatch({type:IMPORT_SINGLE_RECIPE, object:object }) )
)

export const likeRecipe = (like) => dispatch =>(
  postLikeRecipe(like).then(like => dispatch(importRecipe(like.recipe_id)),errors => dispatch(addErrors(errors)))
)
