import axios from 'axios';
import { chatActionTypes } from '../actionTypes';

const apiChat = 'http://localhost:5000';

export const createChat = (participant, token) => (dispatch) => {
  axios
    .post(
      apiChat + '/chat/create',
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
