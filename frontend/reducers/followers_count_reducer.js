import { IMPORT_RECIPES, IMPORT_SINGLE_RECIPE } from '../actions/recipes_actions'

const followersCountReducer = (state = {},action)=>{
  Object.freeze(state)
  switch (action.type) {
    case IMPORT_RECIPES:
      return Object.assign({}, action.object.followers_count)
    case IMPORT_SINGLE_RECIPE:
      return Object.assign({},state, action.object.followers_count)
    default:
      return state
  }
}

export default followersCountReducer
