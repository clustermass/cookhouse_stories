import { IMPORT_RECIPES, IMPORT_SINGLE_RECIPE } from '../actions/recipes_actions'

const followersReducer = (state = {},action)=>{
  Object.freeze(state)
  switch (action.type) {
    case IMPORT_RECIPES:
      return Object.assign({}, action.object.followers)
    case IMPORT_SINGLE_RECIPE:
      return Object.assign({},state, action.object.followers)
    default:
      return state
  }
}

export default followersReducer
