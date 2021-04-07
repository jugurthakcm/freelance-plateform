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

const Settings = () => {
  return (
    <>
      <Navbar />
      <div className="settings container">
        <div className="row">
          <div className="settings__aside col-3">
            <div>
              <h5>Account Settings</h5>
              <ul>
                <li>Name</li>
                <li>Username</li>
                <li>Email</li>
                <li>Password</li>
                <li>Delete Account</li>
              </ul>
            </div>
          </div>
          <div className="settings__change col-9">
            <div className="settings__section settings__changeName">
              <h4>Change name</h4>
              <form>
                <div className="settings__input">
                  <FontAwesomeIcon icon={faUser} />
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First name"
                  />
                </div>

                <div className="settings__input">
                  <FontAwesomeIcon icon={faUser} />
                  <input type="text" name="lastName" placeholder="Last name" />
                </div>

                <button type="submit" className="btn btn-warning">
                  Save
                </button>
              </form>
            </div>

            <div className="settings__section settings__changeUsername">
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

            <div className="settings__section settings__changeEmail">
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

            <div className="settings__section settings__changePassword">
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

            <div className="settings__section settings__changeDeleteAccount">
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
