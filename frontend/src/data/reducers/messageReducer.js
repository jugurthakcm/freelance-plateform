import { messageActionTypes } from '../actionTypes';

const initialState = {
  messages: null,
  error: null,
};

const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case messageActionTypes.GET_MESSAGES:
      return {
        ...state,
        messages: action.payload.data.messages,
      };

    case messageActionTypes.ERROR:
      return {
        ...state,
        error: action.payload.response.data.error,
      };

    default:
      return state;
  }
};

export default messageReducer;
