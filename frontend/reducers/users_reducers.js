import { IMPORT_USER } from '../actions/user_actions'

const usersReducer = (state={}, action) =>{
  Object.freeze(state)
  switch (action.type) {
    case IMPORT_USER:
      return Object.assign({},state, {[action.user.id]: action.user})
    default:
      return state
  }
};

export default usersReducer
