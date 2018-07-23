import {SAVE_SEARCH_FILTERS, SAVE_FAVORITE_RECIPES,DELETE_FAVORITE_RECIPES } from '../actions/session_params_actions'

const sessionParamsReducer = (state = {searchFilters:{},favoriteRecipes:[]},action) => {
  Object.freeze(state)
  switch (action.type) {
    case SAVE_SEARCH_FILTERS:
      return Object.assign({},state, {searchFilters:action.state})
    case SAVE_FAVORITE_RECIPES:
      return Object.assign({},state, {favoriteRecipes:action.state})
    case DELETE_FAVORITE_RECIPES:
      return Object.assign({},{searchFilters:{},favoriteRecipes:[]})
    default:
      return state
  }
}

export default sessionParamsReducer
