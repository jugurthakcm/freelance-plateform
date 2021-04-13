import { combineReducers } from 'redux';
import chatReducer from './chatReducer';
import gigReducer from './gigReducer';
import loadingReducer from './loadingReducer';
import messageReducer from './messageReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  user: userReducer,
  loading: loadingReducer,
  gig: gigReducer,
  chat: chatReducer,
  message: messageReducer,
});

export default rootReducer;
