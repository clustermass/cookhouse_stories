import { IMPORT_SINGLE_RECIPE } from '../actions/recipes_actions'

const measuringsReducer = (state = {},action)=>{
  Object.freeze(state)
  switch (action.type) {
    case IMPORT_SINGLE_RECIPE:
      return Object.assign({}, action.object.measurings)
    default:
      return state
  }
}

export default measuringsReducer
