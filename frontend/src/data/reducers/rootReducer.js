import { combineReducers } from 'redux';
import loadingReducer from './loadingReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  user: userReducer,
  loading: loadingReducer,
});

export default rootReducer;
