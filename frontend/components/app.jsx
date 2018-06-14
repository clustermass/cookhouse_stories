import React from 'react';
import TopNavBarContainer from './top_nav_bar/top_nav_bar_container'
import LogInFormContainer from './session_form/login_form_container'
import SignUpFormContainer from './session_form/signup_form_container'
import ErrorsContainer from './errors/errors_container'
import RecipeIndexContainer from './recipe_index/recipe_index_container'
import RecipeInfoContainer from './recipe_info/recipe_info_container'
import RecipeCreateContainer from './recipe_create/recipe_create_container'

import {
  Route,
  Redirect,
  Switch,
  Link,
  HashRouter
} from 'react-router-dom';


import { AuthRoute, ProtectedRoute } from '../util/route_util';

const App = () => (
  <div className="root-container">
    <header>
      <ErrorsContainer />

    </header>
    <Route path="/" component={TopNavBarContainer} />



    <Switch>
      <AuthRoute exact path="/login" component={LogInFormContainer} />
      <AuthRoute exact path="/signup" component={SignUpFormContainer} />
      <Route exact path="/" component={RecipeIndexContainer} />
      <Route exact path="/recipes/new" component={RecipeCreateContainer} />
      <Route exact path="/recipes/:recipeId" component={RecipeInfoContainer} />
      <Route exact path="/*" component={RecipeIndexContainer} />
    </Switch>

  </div>
);

export default App;
