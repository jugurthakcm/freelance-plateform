import { combineReducers } from 'redux';
import gigReducer from './gigReducer';
import loadingReducer from './loadingReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  user: userReducer,
  loading: loadingReducer,
  gig: gigReducer,
});

export default rootReducer;
