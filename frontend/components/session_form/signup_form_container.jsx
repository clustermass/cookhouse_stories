import { connect } from 'react-redux';
import React from 'react';
import { Link } from 'react-router-dom';
import { createUser } from '../../actions/user_actions';
import SignUpForm from './signup_form';
import { clearErrors } from '../../actions/errors_actions';

const mapStateToProps = (state,ownProps) => {
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
    processForm: (user) => dispatch(createUser(user)),
    clearErrors: () => dispatch(clearErrors()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);
