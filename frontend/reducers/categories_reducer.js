import { IMPORT_RECIPES, IMPORT_SINGLE_RECIPE } from '../actions/recipes_actions'

const categoriesReducer = (state = {},action)=>{
  Object.freeze(state)
  switch (action.type) {
    case IMPORT_RECIPES:
      return Object.assign({}, action.object.categories)
    case IMPORT_SINGLE_RECIPE:
      return Object.assign({},state, action.object.categories)
    default:
      return state
  }
}

export default categoriesReducer
