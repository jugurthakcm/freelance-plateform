import { userActionTypes } from '../actionTypes';

const initialState = {
  user: null,
  success: null,
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    //REGISTER
    case userActionTypes.REGISTER:
      return {
        ...state,
        success: 'Please check your email to confirm your account',
        error: null,
      };

    //REGISTER_FAIL
    case userActionTypes.ERROR_REGISTER:
      return {
        ...state,
        error: action.payload.response.data,
        message: null,
      };
    //LOGIN
    case userActionTypes.LOGIN:
      return {
        ...state,
        success: 'Logged In',
        error: null,
      };

    //LOGIN_FAIL
    case userActionTypes.ERROR_LOGIN:
      return {
        ...state,
        error: action.payload.response.data,
        success: null,
      };

    default:
      return state;
  }
};

export default userReducer;
