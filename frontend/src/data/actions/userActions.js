import axios from '../../axios';
import { userActionTypes, loadingActionTypes } from '../actionTypes';

//Register User
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

//Login User
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

//Load user
export const loadUser = (token) => (dispatch) => {
  dispatch({ type: userActionTypes.IS_LOADING });
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

//Logout user
export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('token');
  dispatch({ type: userActionTypes.LOGOUT });
};

//Update Education
export const updateEducation = (
  id,
  { school, degree, yearStart, yearEnd, areaOfStudy },
  token
) => (dispatch) => {
  axios
    .put(
      '/education/update',
      { id, school, degree, yearStart, yearEnd, areaOfStudy },
      {
        headers: {
          authorization: 'Bearer ' + token,
        },
      }
    )
    .then((res) => {
      dispatch({ type: userActionTypes.UPDATE_SUCCESS, payload: res });
    })
    .catch((err) => {
      dispatch({ type: userActionTypes.UPDATE_ERROR, payload: err });
    });
};

//Delete Education
export const deleteEducation = (id, token) => (dispatch) =>
  axios
    .post(
      '/education/delete',
      { id },
      {
        headers: {
          authorization: 'Bearer ' + token,
        },
      }
    )
    .then((res) => {
      dispatch({ type: userActionTypes.UPDATE_SUCCESS, payload: res });
    })
    .catch((err) => {
      dispatch({ type: userActionTypes.UPDATE_ERROR, payload: err });
    });

//Update experience
export const updateExperience = (
  id,
  { company, job, yearStart, yearEnd, areaOfWork },
  token
) => (dispatch) => {
  axios
    .put(
      '/experience/update',
      { id, company, job, yearStart, yearEnd, areaOfWork },
      {
        headers: {
          authorization: 'Bearer ' + token,
        },
      }
    )
    .then((res) => {
      dispatch({ type: userActionTypes.UPDATE_SUCCESS, payload: res });
    })
    .catch((err) => {
      dispatch({ type: userActionTypes.UPDATE_ERROR, payload: err });
    });
};

//Delete Experience
export const deleteExperience = (id, token) => (dispatch) =>
  axios
    .post(
      '/experience/delete',
      { id },
      {
        headers: {
          authorization: 'Bearer ' + token,
        },
      }
    )
    .then((res) => {
      dispatch({ type: userActionTypes.UPDATE_SUCCESS, payload: res });
    })
    .catch((err) => {
      dispatch({ type: userActionTypes.UPDATE_ERROR, payload: err });
    });

//Add language
export const addLanguage = (id, { language, level }, token) => (dispatch) => {
  axios
    .post(
      '/language',
      { id, language, level },
      {
        headers: {
          authorization: 'Bearer ' + token,
        },
      }
    )
    .then((res) => {
      dispatch({ type: userActionTypes.UPDATE_SUCCESS, payload: res });
    })
    .catch((err) => {
      dispatch({ type: userActionTypes.UPDATE_ERROR, payload: err });
    });
};

export const updateLanguage = (arr, token) => (dispatch) =>
  axios
    .put(
      '/language',
      { arr },
      {
        headers: {
          authorization: 'Bearer ' + token,
        },
      }
    )
    .then((res) => {
      dispatch({ type: userActionTypes.UPDATE_SUCCESS, payload: res });
    })
    .catch((err) => {
      dispatch({ type: userActionTypes.UPDATE_ERROR, payload: err });
    });

export const updateTitle = (title, token) => (dispatch) =>
  axios
    .put(
      '/title',
      { title },
      {
        headers: {
          authorization: 'Bearer ' + token,
        },
      }
    )
    .then((res) => {
      dispatch({ type: userActionTypes.UPDATE_SUCCESS, payload: res });
    })
    .catch((err) => {
      dispatch({ type: userActionTypes.UPDATE_ERROR, payload: err });
    });

export const updateBio = (bio, token) => (dispatch) =>
  axios
    .put(
      '/bio',
      { bio },
      {
        headers: {
          authorization: 'Bearer ' + token,
        },
      }
    )
    .then((res) => {
      dispatch({ type: userActionTypes.UPDATE_SUCCESS, payload: res });
    })
    .catch((err) => {
      dispatch({ type: userActionTypes.UPDATE_ERROR, payload: err });
    });

export const updateSkills = (skills, token) => (dispatch) =>
  axios
    .put(
      '/skills/update',
      { skills },
      {
        headers: {
          authorization: 'Bearer ' + token,
        },
      }
    )
    .then((res) => {
      dispatch({ type: userActionTypes.UPDATE_SUCCESS, payload: res });
    })
    .catch((err) => {
      dispatch({ type: userActionTypes.UPDATE_ERROR, payload: err });
    });

export const changeName = ({ firstName, lastName }, token) => (dispatch) => {
  axios
    .put(
      '/settings/name/edit',
      { firstName, lastName },
      {
        headers: {
          authorization: 'Bearer ' + token,
        },
      }
    )
    .then((res) => {
      dispatch({ type: userActionTypes.UPDATE_SUCCESS, payload: res });
      window.location.reload();
    })
    .catch((err) => {
      dispatch({ type: userActionTypes.UPDATE_ERROR, payload: err });
    });
};

export const changeUsername = ({ username }, token) => (dispatch) => {
  axios
    .put(
      '/settings/username/edit',
      { username },
      {
        headers: {
          authorization: 'Bearer ' + token,
        },
      }
    )
    .then((res) => {
      dispatch({ type: userActionTypes.UPDATE_SUCCESS, payload: res });
      window.location.reload();
    })
    .catch((err) => {
      dispatch({ type: userActionTypes.UPDATE_ERROR, payload: err });
    });
};

export const changeEmail = ({ email }, token) => (dispatch) => {
  axios
    .put(
      '/settings/email/edit',
      { email },
      {
        headers: {
          authorization: 'Bearer ' + token,
        },
      }
    )
    .then((res) => {
      dispatch({ type: userActionTypes.UPDATE_SUCCESS, payload: res });
      window.location.reload();
    })
    .catch((err) => {
      dispatch({ type: userActionTypes.UPDATE_ERROR, payload: err });
    });
};

export const changePassword = (
  { oldPassword, newPassword, confirmedPassword },
  token
) => (dispatch) => {
  axios
    .put(
      '/settings/password/edit',
      { oldPassword, newPassword, confirmedPassword },
      {
        headers: {
          authorization: 'Bearer ' + token,
        },
      }
    )
    .then((res) => {
      dispatch({ type: userActionTypes.UPDATE_SUCCESS, payload: res });
      window.location.reload();
    })
    .catch((err) => {
      dispatch({ type: userActionTypes.UPDATE_ERROR, payload: err });
    });
};
