import { userActionTypes } from '../actionTypes';

const initialState = {
  user: null,
  token: localStorage.getItem('token'),
  success: null,
  error: null,
  status: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    //REGISTER
    case userActionTypes.REGISTER:
      localStorage.setItem('token', action.payload.data.token);
      return {
        ...state,
        success: action.payload.data.message,
        token: action.payload.data.token,
        status: action.payload.status,
      };

    //ERROR_REGISTER
    case userActionTypes.ERROR_REGISTER:
      return {
        ...state,
        error: action.payload.response.data.error,
        status: action.payload.response.status,
      };

    case userActionTypes.LOGIN:
      localStorage.setItem('token', action.payload.data.token);
      return {
        ...state,
        token: action.payload.data.token,
        success: 'Logged In',
        status: action.payload.status,
      };

    case userActionTypes.ERROR_LOGIN:
      return {
        ...state,
        error: action.payload.response.data.error,
        status: action.payload.status,
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

    case userActionTypes.UPDATE_SUCCESS:
      return {
        ...state,
        user: action.payload.data.user,
      };

    case userActionTypes.UPDATE_ERROR:
      return {
        ...state,
        error: action.payload.response.data.error,
      };

    case userActionTypes.UPDATE_BIO:
      return {
        ...state,
        bio: action.payload.data.data.bio,
      };

    default:
      return state;
  }
};

export default userReducer;
