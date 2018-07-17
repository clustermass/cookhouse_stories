import { connect } from 'react-redux';
import React from 'react';
import { Link } from 'react-router-dom';
import { importAllRecipes, importQueriedRecipes} from '../../actions/recipes_actions'
import RecipeIndex from './recipe_index'

const msp = (state) => ({

  recipes: Object.values(state.entities.recipes),
  followers: state.entities.followers_count,
  recipesOnPage: 24
})


const mdp = (dispatch) =>({
  importAllRecipes: ()=> dispatch(importAllRecipes()),
  importQueriedRecipes: (query)=> dispatch(importQueriedRecipes(query))
})

export default connect(msp,mdp)(RecipeIndex)
