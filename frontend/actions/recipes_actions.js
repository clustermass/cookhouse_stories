import { getQueriedRecipes, getAllRecipes, getRecipe, postLikeRecipe, getAllRecipeFeatures, postRecipe } from '../util/recipe_utils'
import { addErrors } from './errors_actions'
import { getUserById } from './user_actions'
// import { push } from 'react-router'

export const IMPORT_RECIPES = "IMPORT_RECIPES"
export const IMPORT_SINGLE_RECIPE = "IMPORT_SINGLE_RECIPE"
export const CLEAR_ALL_RECIPE_FEATURES = "CLEAR_ALL_RECIPE_FEATURES"


export const importAllRecipes = () => dispatch =>(
  getAllRecipes().then(object => dispatch({type:IMPORT_RECIPES, object:object }) )
)
export const importQueriedRecipes = (query) => dispatch =>(
  getQueriedRecipes(query).then(object => dispatch({type:IMPORT_RECIPES, object:object }) )
)


export const importRecipe = (id) => dispatch =>(
  getRecipe(id).then(object => dispatch({type:IMPORT_SINGLE_RECIPE, object:object }) )
)

export const likeRecipe = (like) => dispatch =>(
  postLikeRecipe(like).then(like =>{ dispatch(importRecipe(like.recipe_id))
                                     dispatch(getUserById(like.user_id))},errors => dispatch(addErrors(errors)))
)

export const importAllRecipeFeatures = () => dispatch =>(
  getAllRecipeFeatures().then(object => dispatch({type:IMPORT_RECIPES, object:object }),errors => dispatch(addErrors(errors)))
)

export const clearAllRecipeFeatures = () =>({type: CLEAR_ALL_RECIPE_FEATURES})

export const submitRecipe = (recipe) => dispatch =>(
  postRecipe(recipe)
)
