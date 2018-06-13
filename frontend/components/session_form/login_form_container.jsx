import { connect } from 'react-redux';
import React from 'react';
import { Link } from 'react-router-dom';
import { createSession } from '../../actions/session_actions';
import LogInForm from './login_form';
import { clearErrors } from '../../actions/errors_actions';


const mapStateToProps = (state, ownProps) => {
  let fromPath
  if(ownProps.location.state == null){
    fromPath = '/'
  }else{
    fromPath = ownProps.location.state.fromPath
  }

  return {
    fromPath: fromPath,
    errors: Object.values(state.entities.errors),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    processForm: (cred) => dispatch(createSession(cred)),
    clearErrors: () => dispatch(clearErrors()),
    createSession: (cred)=>dispatch(createSession(cred))

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LogInForm);
