import { connect } from 'react-redux';
import React from 'react';
import { Link } from 'react-router-dom';
import { createUser } from '../../actions/user_actions';
import SignUpForm from './signup_form';

const mapStateToProps = (state,ownProps) => {
  let fromPath

  if(ownProps.location.state == null){
    fromPath = '/'
  }else{
    fromPath = ownProps.location.state.fromPath
  }

  return {
    formType: 'Sign Up',
    fromPath: fromPath,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    processForm: (user) => dispatch(createUser(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);
