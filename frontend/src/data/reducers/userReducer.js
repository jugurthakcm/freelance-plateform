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
      };

    //REGISTER_FAIL
    case userActionTypes.ERROR_REGISTER:
      return {
        ...state,
        error: action.payload.response.data,
      };
    default:
      return state;
  }
};

export default userReducer;
