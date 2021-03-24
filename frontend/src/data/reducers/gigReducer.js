import { gigActionTypes } from '../actionTypes';

const initialState = {
  success: null,
  error: null,
};

const gigReducer = (state = initialState, action) => {
  switch (action.type) {
    case gigActionTypes.SUCCESS:
      return {
        ...state,
        success: action.payload.data.message,
      };

    case gigActionTypes.ERROR:
      return {
        ...state,
        error: action.payload.response.data.error,
      };

    default:
      return state;
  }
};

export default gigReducer;
