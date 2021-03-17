import { userActionTypes } from '../actionTypes';

const initialState = {
  user: null,
  token: localStorage.getItem('token'),
  success: null,
  error: null,
  loading: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    //REGISTER
    case userActionTypes.REGISTER:
      return {
        ...state,
        success: action.payload.data.message,
        loading: false,
      };

    //ERROR_REGISTER
    case userActionTypes.ERROR_REGISTER:
      return {
        ...state,
        error: action.payload.response.data.error,
        loading: false,
      };

    case userActionTypes.LOGIN:
      localStorage.setItem('token', action.payload.data.token);
      return {
        ...state,
        token: action.payload.data.token,
        success: 'Logged In',
      };

    case userActionTypes.ERROR_LOGIN:
      return {
        ...state,
        error: action.payload.response.data.error,
      };

    case userActionTypes.LOAD_USER:
      return {
        ...state,
        user: action.payload.data.user[0],
      };

    case userActionTypes.ERROR_LOAD_USER:
      localStorage.removeItem('token');
      return {
        ...state,
        error: action.payload.response.data,
        token: null,
      };

    case userActionTypes.LOGOUT:
      return {
        ...state,
        user: null,
        token: null,
      };

    case userActionTypes.LOADING:
      return {
        ...state,
        loading: true,
      };

    default:
      return state;
  }
};

export default userReducer;
