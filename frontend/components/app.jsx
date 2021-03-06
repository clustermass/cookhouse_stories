import React from 'react';
import TopNavBarContainer from './top_nav_bar/top_nav_bar_container'
import LogInFormContainer from './session_form/login_form_container'
import SignUpFormContainer from './session_form/signup_form_container'
import ErrorsContainer from './errors/errors_container'
import RecipeIndexContainer from './recipe_index/recipe_index_container'
import RecipeInfoContainer from './recipe_info/recipe_info_container'
import RecipeCreateContainer from './recipe_create/recipe_create_container'
import UserInfoContainer from './user_profile/user_profile_container'
import Footer from './footer/footer'
import RecipeEditContainer from './recipe_edit/recipe_edit_container'
import VideosIndexContainer from './videos/videos_index_container'
import CategoryIndexContainer from './category/category_index_container'

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

    <Route path="/" component={TopNavBarContainer} />

  <Switch>
      <AuthRoute exact path="/login" component={LogInFormContainer} />
      <AuthRoute exact path="/signup" component={SignUpFormContainer} />
      <ProtectedRoute exact path="/users/:userId" component={UserInfoContainer} />
      <Route exact path="/" component={RecipeIndexContainer} />
      <Route exact path="/category/:cat" component={CategoryIndexContainer} />
      <Route exact path="/videos" component={VideosIndexContainer} />
      <ProtectedRoute exact path="/edit/:recipeId" component={RecipeEditContainer} />
      <ProtectedRoute exact path="/recipes/new" component={RecipeCreateContainer} />
      <Route exact path="/recipes/:recipeId" component={RecipeInfoContainer} />
      <Route exact path="/*" component={RecipeIndexContainer} />
    </Switch>

    <Route path="/" component={Footer} />

  </div>
);

export default App;
