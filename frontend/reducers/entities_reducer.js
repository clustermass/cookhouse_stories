import { combineReducers } from 'redux';
import UsersReducer from './users_reducers';
import ErrorsReducer from './errors_reducer';

export default combineReducers({
  users : UsersReducer,
  errors: ErrorsReducer,
});
