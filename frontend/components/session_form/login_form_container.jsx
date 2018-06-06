import { connect } from 'react-redux';
import React from 'react';
import { Link } from 'react-router-dom';
import { createSession } from '../../actions/session_actions';
import LogInForm from './login_form';

const mapStateToProps = () => {
  return {
    formType: 'Login',
    navLink: <Link to="/signup">sign up instead</Link>,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    processForm: (cred) => dispatch(createSession(cred)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LogInForm);
