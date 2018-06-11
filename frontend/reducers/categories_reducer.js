import { IMPORT_RECIPES } from '../actions/recipes_actions'

const categoriesReducer = (state = {},action)=>{
  Object.freeze(state)
  switch (action.type) {
    case IMPORT_RECIPES:
      return Object.assign({}, action.object.categories)
    default:
      return state
  }
}

export default categoriesReducer
