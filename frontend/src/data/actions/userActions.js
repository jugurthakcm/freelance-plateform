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
