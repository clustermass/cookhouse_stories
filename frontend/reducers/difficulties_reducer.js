import { IMPORT_RECIPES, IMPORT_SINGLE_RECIPE } from '../actions/recipes_actions'

const difficultiesReducer = (state = {},action)=>{
  Object.freeze(state)
  switch (action.type) {
    case IMPORT_RECIPES:
      return Object.assign({}, action.object.difficulties)
    case IMPORT_SINGLE_RECIPE:
      return Object.assign({},state, action.object.difficulties)
    default:
      return state
  }
}

export default difficultiesReducer
