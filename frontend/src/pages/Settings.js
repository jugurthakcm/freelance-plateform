import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import './Settings.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope,
  faLock,
  faUser,
  faUserTag,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import { useLanguageContext } from '../ContextAPI/LanguageProvider';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import {
  changeEmail,
  changeName,
  changePassword,
  changeUsername,
} from '../data/actions/userActions';
import { useHistory } from 'react-router-dom';

const Settings = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.user);
  const token = user && user.token;

  useEffect(() => {
    if (!user.token) history.push('/login');
  }, [user, history]);

  const handleScroll = (id) => {
    const el = document.getElementById(id);
    window.scrollTo(0, el.offsetTop - 100);
  };

  const [language, dispatchLanguage] = useLanguageContext();

  const changeLanguage = (language) => {
    localStorage.setItem('language', JSON.stringify({ language }));
    dispatchLanguage({ type: language, language });
  };

  //Change Name Form Handle
  const schemaName = Joi.object({
    firstName: Joi.string().trim().min(2).max(30).required(),
    lastName: Joi.string().trim().min(2).max(30).required(),
  });

  const {
    register: registerName,
    handleSubmit: handleSubmitName,
    errors: errorsName,
  } = useForm({
    resolver: joiResolver(schemaName),
  });

  const submitChangeName = (e) => {
    dispatch(changeName(e, token));
  };

  //Change username Form Handle
  const schemaUsername = Joi.object({
    username: Joi.string()
      .trim()
      .min(4)
      .max(20)
      .required()
      .pattern(
        new RegExp('^[a-zA-Z0-9]([._](?![._])|[a-zA-Z0-9]){0,20}[a-zA-Z0-9]$')
      )
      .messages({
        'string.pattern.base': 'Invalid username',
      }),
  });

  const {
    register: registerUsername,
    handleSubmit: handleSubmitUsername,
    errors: errorsUsername,
  } = useForm({
    resolver: joiResolver(schemaUsername),
  });

  const submitChangeUsername = (e) => {
    dispatch(changeUsername(e, token));
  };

  //Change Email Form Handle
  const schemaEmail = Joi.object({
    email: Joi.string()
      .trim()
      .email({ tlds: { allow: false } })
      .required(),
  });

  const {
    register: registerEmail,
    handleSubmit: handleSubmitEmail,
    errors: errorsEmail,
  } = useForm({
    resolver: joiResolver(schemaEmail),
  });

  const submitChangeEmail = (e) => {
    dispatch(changeEmail(e, token));
  };
  //Change Password Form Handle
  const schemaPassword = Joi.object({
    oldPassword: Joi.string().trim().required(),
    newPassword: Joi.string().trim().required().min(8),
    confirmedPassword: Joi.ref('newPassword'),
  });

  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    errors: errorsPassword,
  } = useForm({
    resolver: joiResolver(schemaPassword),
  });

  const submitChangePassword = (e) => {
    dispatch(changePassword(e, token));
  };

  return (
    <>
      <Navbar />
      <div className="settings container">
        <div className="row">
          <div className="settings__aside col-3">
            <div>
              <h5>Account Settings</h5>
              <ul>
                <li onClick={() => handleScroll('changeName')}>Name</li>
                <li onClick={() => handleScroll('changeUsername')}>Username</li>
                <li onClick={() => handleScroll('changeEmail')}>Email</li>
                <li onClick={() => handleScroll('changePassword')}>Password</li>
                <li onClick={() => handleScroll('changeLanguage')}>Language</li>
                <li onClick={() => handleScroll('deleteAccount')}>
                  Delete Account
                </li>
              </ul>
            </div>
          </div>
          <div className="settings__change col-9">
            <div
              className="settings__section settings__changeName"
              id="changeName"
            >
              <h4>Change name</h4>
              <form onSubmit={handleSubmitName(submitChangeName)}>
                <div className="settings__input">
                  <FontAwesomeIcon icon={faUser} />
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First name"
                    ref={registerName}
                  />
                </div>
                {errorsName.firstName && (
                  <p className="textError">{errorsName.firstName?.message}</p>
                )}

                <div className="settings__input">
                  <FontAwesomeIcon icon={faUser} />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last name"
                    ref={registerName}
                  />
                </div>
                {errorsName.lastName && (
                  <p className="textError">
                    {errorsPassword.lastName?.message}
                  </p>
                )}

                <button type="submit" className="btn btn-warning">
                  Save
                </button>
              </form>
            </div>

            <div
              className="settings__section settings__changeUsername"
              id="changeUsername"
            >
              <h4>Change username</h4>
              <form onSubmit={handleSubmitUsername(submitChangeUsername)}>
                <div className="settings__input">
                  <FontAwesomeIcon icon={faUserTag} />
                  <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    ref={registerUsername}
                  />
                </div>
                {errorsUsername.username && (
                  <p className="textError">
                    {errorsUsername.username?.message}
                  </p>
                )}
                <button type="submit" className="btn btn-warning">
                  Save
                </button>
              </form>
            </div>

            <div
              className="settings__section settings__changeEmail"
              id="changeEmail"
            >
              <h4>Change email</h4>
              <form onSubmit={handleSubmitEmail(submitChangeEmail)}>
                <div className="settings__input">
                  <FontAwesomeIcon icon={faEnvelope} />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    ref={registerEmail}
                  />
                </div>
                {errorsEmail.email && (
                  <p className="textError">{errorsEmail.email?.message}</p>
                )}
                <button type="submit" className="btn btn-warning">
                  Save
                </button>
              </form>
            </div>

            <div
              className="settings__section settings__changePassword"
              id="changePassword"
            >
              <h4>Change Password</h4>
              <form onSubmit={handleSubmitPassword(submitChangePassword)}>
                <div className="settings__input">
                  <FontAwesomeIcon icon={faLock} />
                  <input
                    type="password"
                    name="oldPassword"
                    placeholder="Old Password"
                    ref={registerPassword}
                  />
                </div>
                {errorsPassword.oldPassword && (
                  <p className="textError">
                    {errorsPassword.oldPassword?.message}
                  </p>
                )}
                <div className="settings__input">
                  <FontAwesomeIcon icon={faLock} />
                  <input
                    type="password"
                    name="newPassword"
                    placeholder="New Password"
                    ref={registerPassword}
                  />
                </div>
                {errorsPassword.newPassword && (
                  <p className="textError">
                    {errorsPassword.newPassword?.message}
                  </p>
                )}
                <div className="settings__input">
                  <FontAwesomeIcon icon={faLock} />
                  <input
                    type="password"
                    name="confirmedPassword"
                    placeholder="Confirm Password"
                    ref={registerPassword}
                  />
                </div>
                {errorsPassword.confirmedPassword && (
                  <p className="textError">
                    {errorsPassword.confirmedPassword?.message}
                  </p>
                )}

                <button type="submit" className="btn btn-warning">
                  Save
                </button>
              </form>
            </div>

            <div
              className="settings__section settings__changeLanguage"
              id="changeLanguage"
            >
              <h4>Change Language</h4>
              <form>
                <select
                  className="form-select mb-2"
                  onChange={(e) => changeLanguage(e.target.value)}
                  value={language}
                >
                  <option value="english">English</option>
                  <option value="french">Français</option>
                  <option value="arabic">العربية</option>
                </select>
                {/* <button type="submit" className="btn btn-warning">
                  Save
                </button> */}
              </form>
            </div>

            <div
              className="settings__section settings__deleteAccount"
              id="deleteAccount"
            >
              <h4>Delete account</h4>
              <form>
                <button type="submit" className="btn btn-danger">
                  <FontAwesomeIcon icon={faTrashAlt} className="me-2" /> Delete
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
