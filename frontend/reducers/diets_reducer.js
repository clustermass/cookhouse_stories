import { IMPORT_RECIPES } from '../actions/recipes_actions'

const dietsReducer = (state = {},action)=>{
  Object.freeze(state)
  switch (action.type) {
    case IMPORT_RECIPES:
      return Object.assign({}, action.object.diets)
    default:
      return state
  }
}

export default dietsReducer
