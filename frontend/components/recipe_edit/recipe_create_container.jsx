import { connect } from 'react-redux';
import React from 'react';
import { Link } from 'react-router-dom';
import { importAllRecipes, importRecipe } from '../../actions/recipes_actions'
import { clearErrors } from '../../actions/errors_actions';
import RecipeCreate from './recipe_create'

const msp = (state,ownProps) => {
  return {entities: state.entities,
          errors: Object.values(state.entities.errors),
          session: state.session,
          loggedIn: Boolean(state.session.id),


    }
}


const mdp = (dispatch) =>({
  getAllUsers: ()=> dispatch(getAllUsers()),
  importRecipe: (id)=> dispatch(importRecipe(id)),
  postComment: (comment) => dispatch(postComment(comment)),
  clearErrors: () => dispatch(clearErrors()),
})

export default connect(msp,mdp)(RecipeCreate)
