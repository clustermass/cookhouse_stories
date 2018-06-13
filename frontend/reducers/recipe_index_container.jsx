import { connect } from 'react-redux';
import React from 'react';
import { Link } from 'react-router-dom';
import { importAllRecipes } from '../../actions/recipes_actions'
import RecipeIndex from './recipe_index'

const msp = (state) => ({

  recipes: Object.values(state.entities.recipes),
  followers: state.entities.followers,
  recipesOnPage: 3
})


const mdp = (dispatch) =>({
  importAllRecipes: ()=> dispatch(importAllRecipes())
})

export default connect(msp,mdp)(RecipeIndex)
