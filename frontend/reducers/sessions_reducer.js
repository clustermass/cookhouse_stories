import { CREATE_SESSION, DESTROY_SESSION } from '../actions/session_actions'

const sessionsReducer = (state={id:null}, action) =>{
  Object.freeze(state)
  switch (action.type) {
    case CREATE_SESSION:
      return Object.assign({}, { id: action.user.id })
    case DESTROY_SESSION:
      return {id: null}
    default:
      return state
  }
};

export default sessionsReducer
