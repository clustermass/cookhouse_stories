import { IMPORT_USER, IMPORT_ALL_USERS } from '../actions/user_actions'
// import { CREATE_SESSION  } from '../actions/session_actions'
const usersReducer = (state={}, action) =>{
  Object.freeze(state)
  switch (action.type) {
    case IMPORT_USER:
      return Object.assign({},state, {[action.user.id]: action.user})
    case IMPORT_ALL_USERS:
      return Object.assign({},state, action.users.users )
    default:
      return state
  }
};

export default usersReducer
