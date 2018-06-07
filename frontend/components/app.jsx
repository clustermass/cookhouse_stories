import React from 'react';
import TopNavBarContainer from './top_nav_bar/top_nav_bar_container'
import LogInFormContainer from './session_form/login_form_container'
import SignUpFormContainer from './session_form/signup_form_container'
import ErrorsContainer from './errors/errors_container'


import {
  Route,
  Redirect,
  Switch,
  Link,
  HashRouter
} from 'react-router-dom';


import { AuthRoute, ProtectedRoute } from '../util/route_util';

const App = () => (
  <div>
    <header>
      <ErrorsContainer />
    
    </header>
    <Switch>
      <AuthRoute exact path="/login" component={LogInFormContainer} />
      <AuthRoute exact path="/signup" component={SignUpFormContainer} />

      <Route path="/" component={TopNavBarContainer} />
    </Switch>
  </div>
);

export default App;