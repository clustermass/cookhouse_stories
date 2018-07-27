import { connect } from 'react-redux';
import React from 'react';
import { Link } from 'react-router-dom';
import { importAllRecipes, importQueriedRecipes} from '../../actions/recipes_actions'
import { saveSearchFilters } from '../../actions/session_params_actions'
import VideosIndex from './videos_index'

const msp = (state) => ({
  categories: Object.values(state.entities.categories),
  cuisines: Object.values(state.entities.cuisines),
  diets: Object.values(state.entities.diets),
  difficulties: Object.values(state.entities.difficulties),
  main_ingredients: Object.values(state.entities.ingredients),
  recipes: Object.values(state.entities.recipes),
  followers: state.entities.followers_count,
  state : state.entities.session_params.searchFilters,
  favorites: state.entities.session_params.favoriteRecipes,
  videos: state.entities.videos,
  recipesOnPage: 24
})


const mdp = (dispatch) =>({
  importAllRecipes: ()=> dispatch(importAllRecipes()),
  importQueriedRecipes: (query)=> dispatch(importQueriedRecipes(query)),
  saveSearchFilters: (state) => dispatch(saveSearchFilters(state))
})

export default connect(msp,mdp)(VideosIndex)
