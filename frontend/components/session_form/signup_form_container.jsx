import { connect } from 'react-redux';
import React from 'react';
import { Link } from 'react-router-dom';
import { createUser } from '../../actions/user_actions';
import SignUpForm from './signup_form';

const mapStateToProps = (state) => {
  return {
    formType: 'Sign Up',
    navLink: <Link to="/login">log in instead</Link>,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    processForm: (user) => dispatch(createUser(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);
