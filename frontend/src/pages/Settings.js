import React from 'react';
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
import { changeName } from '../data/actions/userActions';

const Settings = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const token = user && user.token;

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

  /* //Change username Form Handle
  const schemaUsername = Joi.object({
    username: Joi.string().trim().min(2).max(30).required(),
  });

  const {
    register: registerUsername,
    handleSubmit: handleSubmitUsername,
    errors: errorsUsername,
  } = useForm({
    resolver: joiResolver(schemaName),
  });

  const submitChangeUsername = (e) => {
    dispatch(changeName(e, token));
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
  }; */

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

                <div className="settings__input">
                  <FontAwesomeIcon icon={faUser} />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last name"
                    ref={registerName}
                  />
                </div>

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
              <form>
                <div className="settings__input">
                  <FontAwesomeIcon icon={faUserTag} />
                  <input type="text" name="username" placeholder="Username" />
                </div>

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
              <form>
                <div className="settings__input">
                  <FontAwesomeIcon icon={faEnvelope} />
                  <input type="email" name="email" placeholder="Email" />
                </div>
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
              <form>
                <div className="settings__input">
                  <FontAwesomeIcon icon={faLock} />
                  <input
                    type="password"
                    name="oldPassword"
                    placeholder="Old Password"
                  />
                </div>
                <div className="settings__input">
                  <FontAwesomeIcon icon={faLock} />
                  <input
                    type="password"
                    name="newPassword"
                    placeholder="New Password"
                  />
                </div>
                <div className="settings__input">
                  <FontAwesomeIcon icon={faLock} />
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                  />
                </div>

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
