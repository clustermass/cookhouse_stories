import { connect } from 'react-redux';
import React from 'react';
import { Link } from 'react-router-dom';
import { importAllRecipes } from '../../actions/recipes_actions'
import { getAllUsers } from '../../actions/user_actions'
import RecipeInfo from './recipe_info'

const msp = (state,ownProps) => {
  console.log(ownProps)
  return {recipe: Object.values(state.entities.recipes),
  followers: state.entities.followers,}
}


const mdp = (dispatch) =>({
  getAllUsers: ()=> dispatch(getAllUsers())
})

export default connect(msp,mdp)(RecipeInfo)
