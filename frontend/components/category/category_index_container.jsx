import { connect } from 'react-redux';
import React from 'react';
import { Link } from 'react-router-dom';
import { importAllRecipes} from '../../actions/recipes_actions'

import CategoryIndex from './category_index'

const msp = (state,ownProps) => ({
  categories: Object.values(state.entities.categories),
  recipes: Object.values(state.entities.recipes),
  recipesOnPage: 24,
  category:ownProps.match.params.cat,
  followers: state.entities.followers_count,
  favorites: state.entities.session_params.favoriteRecipes,
})


const mdp = (dispatch) =>({
  importAllRecipes: ()=> dispatch(importAllRecipes()),
})

export default connect(msp,mdp)(CategoryIndex)
