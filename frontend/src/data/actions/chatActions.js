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
    .then((res) => {
      dispatch({ type: chatActionTypes.CREATE_CHAT, payload: res });
      window.location.href = '/chat/' + res.data.chat._id;
    })
    .catch((err) => dispatch({ type: chatActionTypes.ERROR, payload: err }));
};

export const getChat = (id, token) => (dispatch) => {
  axios
    .get(
      '/chat/' + id,

      {
        headers: {
          authorization: 'Bearer ' + token,
        },
      }
    )
    .then((res) => {
      if (!res.data.chat) window.location.href = '/';
      dispatch({ type: chatActionTypes.GET_CHAT, payload: res });
    })
    .catch((err) => {
      dispatch({ type: chatActionTypes.ERROR, payload: err });
    });
};

export const getMyChats = (token) => (dispatch) => {
  axios
    .get('/chat/user-chats', {
      headers: {
        authorization: 'Bearer ' + token,
      },
    })
    .then((res) => {
      dispatch({ type: chatActionTypes.GET_ALL_CHATS, payload: res });
    })
    .catch((err) => {
      dispatch({ type: chatActionTypes.ERROR, payload: err });
    });
};
