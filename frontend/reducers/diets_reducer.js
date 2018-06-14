import { IMPORT_RECIPES, IMPORT_SINGLE_RECIPE, CLEAR_ALL_RECIPE_FEATURES} from '../actions/recipes_actions'

const dietsReducer = (state = {},action)=>{
  Object.freeze(state)
  switch (action.type) {
    case IMPORT_RECIPES:
      return Object.assign({}, action.object.diets)
    case IMPORT_SINGLE_RECIPE:
      return Object.assign({},state, action.object.diets)
    case CLEAR_ALL_RECIPE_FEATURES:
      return {}
    default:
      return state
  }
}

export default dietsReducer
