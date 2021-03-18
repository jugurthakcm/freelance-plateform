import axios from '../../axios';
import { userActionTypes, loadingActionTypes } from '../actionTypes';

export const registerUser = (e, phone) => (dispatch) => {
  dispatch({ type: loadingActionTypes.LOADING });
  const { firstName, lastName, username, email, password } = e;
  axios
    .post('/register', {
      firstName,
      lastName,
      username,
      email,
      phone,
      password,
    })
    .then((res) => {
      dispatch({ type: userActionTypes.REGISTER, payload: res });
      dispatch({ type: loadingActionTypes.NO_LOADING });
      window.location.reload();
    })
    .catch((err) => {
      dispatch({ type: userActionTypes.ERROR_REGISTER, payload: err });
      dispatch({ type: loadingActionTypes.NO_LOADING });
    });
};

export const loginUser = ({ email, password }) => (dispatch) => {
  dispatch({ type: loadingActionTypes.LOADING });
  axios
    .post('/login', {
      email,
      password,
    })
    .then((res) => {
      dispatch({ type: userActionTypes.LOGIN, payload: res });
      dispatch(loadUser(localStorage.getItem('token')));
      dispatch({ type: loadingActionTypes.NO_LOADING });
      window.location.reload();
    })
    .catch((err) => {
      dispatch({ type: userActionTypes.ERROR_LOGIN, payload: err });
      dispatch({ type: loadingActionTypes.NO_LOADING });
    });
};

export const loadUser = (token) => (dispatch) => {
  axios
    .get('/user', {
      headers: {
        authorization: 'Bearer ' + token,
      },
    })
    .then((res) => dispatch({ type: userActionTypes.LOAD_USER, payload: res }))
    .catch((err) =>
      dispatch({ type: userActionTypes.ERROR_LOAD_USER, payload: err })
    );
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('token');
  dispatch({ type: userActionTypes.LOGOUT });
};

export const updateEducation = (
  id,
  { school, degree, yearStart, yearEnd, areaOfStudy },
  token
) => (dispatch) => {
  dispatch({ type: loadingActionTypes.LOADING });
  axios
    .put(
      '/education',
      { id, school, degree, yearStart, yearEnd, areaOfStudy },
      {
        headers: {
          authorization: 'Bearer ' + token,
        },
      }
    )
    .then((res) => {
      dispatch({ type: userActionTypes.EDUCATION_SUCCESS, payload: res });
      dispatch({ type: loadingActionTypes.NO_LOADING });
      window.location.reload();
    })
    .catch((err) => {
      dispatch({ type: userActionTypes.EDUCATION_ERROR, payload: err });
      dispatch({ type: loadingActionTypes.NO_LOADING });
    });
};
