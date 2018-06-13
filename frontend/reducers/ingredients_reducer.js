import { IMPORT_SINGLE_RECIPE } from '../actions/recipes_actions'

const ingredientsReducer = (state = {},action)=>{
  Object.freeze(state)
  switch (action.type) {
    case IMPORT_SINGLE_RECIPE:
      return Object.assign({}, action.object.ingredients)
    default:
      return state
  }
}

export default ingredientsReducer
