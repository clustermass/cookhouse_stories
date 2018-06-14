import { IMPORT_SINGLE_RECIPE,IMPORT_RECIPES, CLEAR_ALL_RECIPE_FEATURES } from '../actions/recipes_actions'

const ingredientsReducer = (state = {},action)=>{
  Object.freeze(state)
  switch (action.type) {
    case IMPORT_SINGLE_RECIPE:
      return Object.assign({}, action.object.ingredients)
    case IMPORT_RECIPES:
      return Object.assign({}, action.object.ingredients)
    case CLEAR_ALL_RECIPE_FEATURES:
      return {}
    default:
      return state
  }
}

export default ingredientsReducer
