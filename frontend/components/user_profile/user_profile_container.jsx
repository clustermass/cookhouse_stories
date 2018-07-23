import { connect } from 'react-redux';
import React from 'react';
// import { Link } from 'react-router-dom';
import { importAllRecipes } from '../../actions/recipes_actions'
import { getAllUsers, getUserById } from '../../actions/user_actions'
// import { postComment } from '../../actions/comments_actions'
import { clearErrors } from '../../actions/errors_actions';
import UserInfo from './user_profile'

const msp = (state,ownProps) => {
  return {
     currentUserId: state.session.id,
     userId: parseInt(ownProps.match.params.userId),
     usersHash: state.entities.users,
     recipes: Object.values(state.entities.recipes),
     followers: state.entities.followers_count,
     favorites: state.entities.session_params.favoriteRecipes,
     recipesOnPage: 24,
    }
}


const mdp = (dispatch) =>({

  importAllRecipes: ()=> dispatch(importAllRecipes()),
  getUserById: (id)=> dispatch(getUserById(id)),
  // postComment: (comment) => dispatch(postComment(comment)),
  clearErrors: () => dispatch(clearErrors()),
  // likeRecipe: (like) => dispatch(likeRecipe(like))
})

export default connect(msp,mdp)(UserInfo)
