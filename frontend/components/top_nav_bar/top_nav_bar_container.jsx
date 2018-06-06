import { connect } from 'react-redux';
import React from 'react';
import { Link } from 'react-router-dom';
import TopNavBar from './top_nav_bar'
import { createSession, destroySession } from '../../actions/session_actions'


const msp = (state) =>({
  session: state.session,
  loggedIn: Boolean(state.session.id),
  usersHash: state.entities.users
})


const mdp = (dispatch) =>({
createSession: (creds) => dispatch(createSession(creds)),
destroySession: () => dispatch(destroySession())
})


export default connect(msp,mdp)(TopNavBar)
