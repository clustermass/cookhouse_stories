import { combineReducers } from 'redux';
import UsersReducer from './users_reducers';
import ErrorsReducer from './errors_reducer';
import RecipesReducer from './recipes_reducer'
import DifficultiesReducer from './difficulties_reducer'
import CategoriesReducer from './categories_reducer'
import CuisineReducer from './cuisines_reducer'
import DietsReducer from './diets_reducer'
import FollowersReducer from './followers_reducer'
import CommentssReducer from './comments_reducer'
import MeasuringsReducer from './measurings_reducer'
import FollowersCountReducer from './followers_count_reducer'
import IngredientsReducer from './ingredients_reducer'
import sessionParamsReducer from './session_params_reducer'
import videosReducer from './videos_reducer'

export default combineReducers({
  users : UsersReducer,
  errors: ErrorsReducer,
  recipes: RecipesReducer,
  difficulties: DifficultiesReducer,
  categories: CategoriesReducer,
  cuisines: CuisineReducer,
  diets: DietsReducer,
  followers: FollowersReducer,
  comments: CommentssReducer,
  measurings: MeasuringsReducer,
  followers_count: FollowersCountReducer,
  ingredients: IngredientsReducer,
  session_params: sessionParamsReducer,
  videos: videosReducer,
});
