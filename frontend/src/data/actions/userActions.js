import axios from '../../axios';
import { userActionTypes } from '../actionTypes';

export const registerUser = (e, phone) => (dispatch) => {
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
    .then((res) => dispatch({ type: userActionTypes.REGISTER, payload: res }))
    .catch((err) =>
      dispatch({ type: userActionTypes.ERROR_REGISTER, payload: err })
    );
};

export const loginUser = ({ email, password }) => (dispatch) => {
  axios
    .post('/login', {
      email,
      password,
    })
    .then((res) => {
      dispatch({ type: userActionTypes.LOGIN, payload: res });
      dispatch(loadUser(localStorage.getItem('token')));
    })
    .catch((err) =>
      dispatch({ type: userActionTypes.ERROR_LOGIN, payload: err })
    );
};

export const resetUserState = () => (dispatch) =>
  dispatch({ type: 'RESET_USER_STATE' });

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
    .then(() => window.location.reload())
    .catch((err) => console.log(err.response));
};
