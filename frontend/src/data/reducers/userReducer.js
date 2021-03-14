import { userActionTypes } from '../actionTypes';

const initialState = {
  user: null,
  successRegister: null,
  errorRegister: null,
  successLogin: null,
  errorLogin: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    //REGISTER
    case userActionTypes.REGISTER:
      return {
        ...state,
        successRegister: 'Please check your email to confirm your account',
        errorRegister: null,
        successLogin: null,
        errorLogin: null,
      };

    //REGISTER_FAIL
    case userActionTypes.ERROR_REGISTER:
      return {
        ...state,
        errorRegister: action.payload.response.data,
        successRegister: null,
        successLogin: null,
        errorLogin: null,
      };
    //LOGIN
    case userActionTypes.LOGIN:
      console.log(action.payload.data);
      return {
        ...state,
        successLogin: 'Logged In',
        errorRegister: null,
        successRegister: null,
        errorLogin: null,
      };

    //LOGIN_FAIL
    case userActionTypes.ERROR_LOGIN:
      return {
        ...state,
        errorLogin: action.payload.response.data,
        errorRegister: null,
        successLogin: null,
        successRegister: null,
      };

    case 'RESET_USER_STATE':
      return {
        ...state,
        successRegister: null,
        errorRegister: null,
        successLogin: null,
        errorLogin: null,
      };
    default:
      return state;
  }
};

export default userReducer;
