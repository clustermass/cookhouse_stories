import { IMPORT_RECIPES } from '../actions/recipes_actions'

const followersReducer = (state = {},action)=>{
  Object.freeze(state)
  switch (action.type) {
    case IMPORT_RECIPES:
      return Object.assign({}, action.object.followers)
    default:
      return state
  }
}

export default followersReducer
