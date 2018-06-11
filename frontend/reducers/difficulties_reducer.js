import { IMPORT_RECIPES } from '../actions/recipes_actions'

const difficultiesReducer = (state = {},action)=>{
  Object.freeze(state)
  switch (action.type) {
    case IMPORT_RECIPES:
      return Object.assign({}, action.object.difficulties)
    default:
      return state
  }
}

export default difficultiesReducer
