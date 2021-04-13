export const userActionTypes = {
  LOGIN: 'LOGIN',
  REGISTER: 'REGISTER',
  LOGOUT: 'LOGOUT',
  ERROR_LOGIN: 'ERROR_LOGIN',
  ERROR_REGISTER: 'ERROR_REGISTER',
  ERROR_LOGOUT: 'ERROR_LOGOUT',
  LOAD_USER: 'LOAD_USER',
  ERROR_LOAD_USER: 'ERROR_LOAD_USER',
  UPDATE_SUCCESS: 'UPDATE_SUCCESS',
  UPDATE_ERROR: 'UPDATE_ERROR',
  UPDATE_BIO: 'UPDATE_BIO',
  IS_LOADING: 'IS_LOADING',
};

export const loadingActionTypes = {
  LOADING: 'LOADING',
  NO_LOADING: 'NO_LOADING',
};

export const gigActionTypes = {
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
  GET_MY_GIGS: 'GET_MY_GIGS',
  EXPLORE_GIGS: 'EXPLORE_GIGS',
};

export const chatActionTypes = {
  CREATE_CHAT: 'CREATE_CHAT',
  GET_CHAT: 'GET_CHAT',
  ERROR: 'ERROR',
};

export const messageActionTypes = {
  GET_MESSAGES: 'GET_MESSAGES',
  ERROR: 'ERROR',
};
