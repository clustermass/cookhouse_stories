import { connect } from 'react-redux';
import React from 'react';
import { Link } from 'react-router-dom';
import { importAllRecipes,importRecipe } from '../../actions/recipes_actions'
import { getAllUsers } from '../../actions/user_actions'
import RecipeInfo from './recipe_info'

const msp = (state,ownProps) => {
  return {entities: state.entities,
          session: state.session,
          loggedIn: Boolean(state.session.id),
     // currRecipeId : ownProps.match.params.recipeId
    }
}


const mdp = (dispatch) =>({
  getAllUsers: ()=> dispatch(getAllUsers()),
  importRecipe: (id)=>dispatch(importRecipe(id))
})

export default connect(msp,mdp)(RecipeInfo)
