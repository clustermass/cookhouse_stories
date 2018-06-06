import { combineReducers } from 'redux';
import UsersReducer from './users_reducers';

export default combineReducers({
  users : UsersReducer
});
