import { combineReducers } from 'redux';
import SessionReducer from './sessions_reducer'
import EntitiesReducer from './entities_reducer'

const rootReducer = combineReducers({
  session: SessionReducer,
  entities: EntitiesReducer
});


export default rootReducer
