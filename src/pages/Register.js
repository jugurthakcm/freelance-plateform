import React from 'react';
import './Register.css';
import register from '../assets/images/Register.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope,
  faLock,
  faHome,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Register = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="register">
      <div className="register__container">
        <Link to="/" className="home__link">
          <FontAwesomeIcon icon={faHome} />
          Home
        </Link>
        <img src={register} alt="register" width="400px" />
        <div className="register__form">
          <h2>Register</h2>
          <form onSubmit={handleSubmit}>
            <div className="register__firstName register__input">
              <FontAwesomeIcon icon={faUser} />
              <input type="text" placeholder="First Name" />
            </div>
            <div className="register__lastName register__input">
              <FontAwesomeIcon icon={faUser} />
              <input type="text" placeholder="Last Name" />
            </div>
            <div className="register__email register__input">
              <FontAwesomeIcon icon={faEnvelope} />
              <input type="email" placeholder="Email" />
            </div>
            <div className="register__password register__input">
              <FontAwesomeIcon icon={faLock} />
              <input type="password" placeholder="Password" />
            </div>
            <label htmlFor="rememberMe" className="register__checkbox">
              <input type="checkbox" name="rememberMe" />
              Accept our terms
            </label>
            <div className="register__submit">
              <Link to="/login">Sign In</Link>
              <input type="submit" value="Register" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
