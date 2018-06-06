import { CLEAR_ERRORS, ADD_ERRORS } from '../actions/errors_actions'

const errorsReducer = (state={}, action) =>{
  Object.freeze(state)
  switch (action.type) {
    case CLEAR_ERRORS:
      return {}
    case ADD_ERRORS:
      return Object.assign({},state, action.error)
    default:
      return state
  }
};

export default errorsReducer
