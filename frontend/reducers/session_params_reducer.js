import {SAVE_SEARCH_FILTERS } from '../actions/session_params_actions'

const sessionParamsReducer = (state = {},action) => {
  Object.freeze(state)
  switch (action.type) {
    case SAVE_SEARCH_FILTERS:
      return Object.assign({},state, action.state)
    default:
      return state
  }
}

export default sessionParamsReducer
