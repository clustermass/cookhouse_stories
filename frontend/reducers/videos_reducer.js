import { IMPORT_RECIPES, IMPORT_SINGLE_RECIPE } from '../actions/recipes_actions'

const videosReducer = (state = {},action)=>{
  Object.freeze(state)
  switch (action.type) {
    case IMPORT_RECIPES:
      return Object.assign({}, action.object.videos)
    case IMPORT_SINGLE_RECIPE:
      return Object.assign({},state, action.object.videos)
    default:
      return state
  }
}

export default videosReducer
