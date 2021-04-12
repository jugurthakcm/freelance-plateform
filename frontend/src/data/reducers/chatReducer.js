import { chatActionTypes } from '../actionTypes';

const initialState = {
  chat: null,
  error: null,
};

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case chatActionTypes.CREATE_CHAT:
      return {
        ...state,
        chat: action.payload.data.chat,
      };

    case chatActionTypes.ERROR:
      return {
        ...state,
        error: action.payload.response.data.error,
      };

    default:
      return state;
  }
};

export default chatReducer;
