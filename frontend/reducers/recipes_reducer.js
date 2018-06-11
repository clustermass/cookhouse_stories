import { IMPORT_RECIPES } from '../actions/recipes_actions'

const recepiesReducer = (state = {},action) => {
  Object.freeze(state)
  switch (action.type) {
    case IMPORT_RECIPES:
      return Object.assign({}, action.object.recipes)
    default:
      return state
  }
}

export default recepiesReducer
