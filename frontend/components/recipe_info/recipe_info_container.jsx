import { connect } from 'react-redux';
import React from 'react';
import { Link } from 'react-router-dom';
import { importAllRecipes, importRecipe, likeRecipe } from '../../actions/recipes_actions'
import { getAllUsers } from '../../actions/user_actions'
import { postComment } from '../../actions/comments_actions'
import { clearErrors } from '../../actions/errors_actions';
import RecipeInfo from './recipe_info'

const msp = (state,ownProps) => {
  return {entities: state.entities,
          errors: Object.keys(state.entities.errors),
          session: state.session,
          loggedIn: Boolean(state.session.id),
          comments: Object.values(state.entities.comments)
     // currRecipeId : ownProps.match.params.recipeId
    }
}


const mdp = (dispatch) =>({
  getAllUsers: ()=> dispatch(getAllUsers()),
  importRecipe: (id)=> dispatch(importRecipe(id)),
  postComment: (comment) => dispatch(postComment(comment)),
  clearErrors: () => dispatch(clearErrors()),
  likeRecipe: (like) => dispatch(likeRecipe(like))
})

export default connect(msp,mdp)(RecipeInfo)
