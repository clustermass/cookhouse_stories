import { connect } from 'react-redux';
import React from 'react';
import Errors from './errors';
import { clearErrors } from '../../actions/errors_actions';



const msp = (state) =>(
  {errors: Object.values(state.entities.errors)}
)


const mdp = (dispatch) =>({
  clearErrors: () => dispatch(clearErrors())
})


export default connect(msp,mdp)(Errors)
