import { IMPORT_RECIPES } from '../actions/recipes_actions'

const cuisineReducer = (state = {},action)=>{
  Object.freeze(state)
  switch (action.type) {
    case IMPORT_RECIPES:
      return Object.assign({}, action.object.cuisines)
    default:
      return state
  }
}

export default cuisineReducer
