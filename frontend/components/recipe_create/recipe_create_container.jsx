import { connect } from 'react-redux';
import React from 'react';
import { Link } from 'react-router-dom';
import { importAllRecipes, importRecipe, importAllRecipeFeatures, clearAllRecipeFeatures, submitRecipe } from '../../actions/recipes_actions'
import { clearErrors, addErrors } from '../../actions/errors_actions';
import RecipeCreate from './recipe_create'

const msp = (state,ownProps) => {
  return {
          measurings: state.entities.measurings,
          diets: Object.values(state.entities.diets),
          ingredients: state.entities.ingredients,
          categories:  Object.values(state.entities.categories),
          cuisines:  Object.values(state.entities.cuisines),
          difficulties: Object.values(state.entities.difficulties),
          entities: state.entities,
          errors: Object.keys(state.entities.errors),
          session: state.session,
          loggedIn: Boolean(state.session.id),


    }
}


const mdp = (dispatch) =>({
  // getAllUsers: ()=> dispatch(getAllUsers()),
  // importRecipe: (id)=> dispatch(importRecipe(id)),
  // postComment: (comment) => dispatch(postComment(comment)),
  addErrors: (err) => dispatch(addErrors(err)),
  clearErrors: () => dispatch(clearErrors()),
  importAllRecipeFeatures: () => dispatch(importAllRecipeFeatures()),
  clearAllRecipeFeatures: () => dispatch(clearAllRecipeFeatures()),
  submitRecipe: (recipe) => dispatch(submitRecipe(recipe))
})

export default connect(msp,mdp)(RecipeCreate)
