import { IMPORT_RECIPES, IMPORT_SINGLE_RECIPE } from '../actions/recipes_actions'

const dietsReducer = (state = {},action)=>{
  Object.freeze(state)
  switch (action.type) {
    case IMPORT_RECIPES:
      return Object.assign({}, action.object.diets)
    case IMPORT_SINGLE_RECIPE:
      return Object.assign({},state, action.object.diets)
    default:
      return state
  }
}

export default dietsReducer
