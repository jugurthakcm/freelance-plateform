import axios from '../../axios';
import { chatActionTypes } from '../actionTypes';

export const createChat = (participant, token) => (dispatch) => {
  axios
    .post(
      '/chat/create',
      {
        participant,
      },
      {
        headers: {
          authorization: 'Bearer ' + token,
        },
      }
    )
    .then((res) =>
      dispatch({ type: chatActionTypes.CREATE_CHAT, payload: res })
    )
    .catch((err) => dispatch({ type: chatActionTypes.ERROR, payload: err }));
};
