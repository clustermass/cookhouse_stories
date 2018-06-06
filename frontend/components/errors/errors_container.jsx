import { connect } from 'react-redux';
import React from 'react';
import clearErrors from '../../actions/errors_actions'
import Errors from './errors'




const msp = (state) =>{
  if (state.errors != null){
    return {  errors: Object.values(state.errors) }
  }else{
    return {}
  }

}


const mdp = (dispatch) =>({
  clearErrors: () => dispatch(clearErrors())
})


export default connect(msp,mdp)(Errors)
