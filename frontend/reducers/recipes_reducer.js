import { IMPORT_RECIPES, IMPORT_SINGLE_RECIPE } from '../actions/recipes_actions'

const recepiesReducer = (state = {},action) => {
  Object.freeze(state)
  switch (action.type) {
    case IMPORT_RECIPES:
      return Object.assign({}, action.object.recipes)
    case IMPORT_SINGLE_RECIPE:
      return Object.assign({},state, {[action.recipe.id]: action.recipe})
    default:
      return state
  }
}

export default recepiesReducer
