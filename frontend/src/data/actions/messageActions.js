import axios from '../../axios';
import { messageActionTypes } from '../actionTypes';

export const getMessages = (chatId, token) => (dispatch) => {
  axios
    .get(`/messages/${chatId}`, {
      headers: {
        authorization: 'Bearer ' + token,
      },
    })
    .then((res) =>
      dispatch({ type: messageActionTypes.GET_MESSAGES, payload: res })
    )
    .catch((err) => dispatch({ type: messageActionTypes.ERROR, payload: err }));
};
