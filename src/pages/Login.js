import React from 'react';
import './Login.css';
import login from '../assets/images/Login.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faHome } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Login = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="login">
      <div className="login__container">
        <Link to="/" className="home__link">
          <FontAwesomeIcon icon={faHome} />
          Home
        </Link>
        <img src={login} alt="login" width="400px" />
        <div className="login__form">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="login__email login__input">
              <FontAwesomeIcon icon={faEnvelope} />
              <input type="email" placeholder="Email" />
            </div>
            <div className="login__password login__input">
              <FontAwesomeIcon icon={faLock} />
              <input type="password" placeholder="Password" />
            </div>
            <label htmlFor="rememberMe" className="login__checkbox">
              <input type="checkbox" name="rememberMe" />
              Remember me
            </label>
            <div className="login__submit">
              <p>Forgot password ?</p>
              <input type="submit" value="Login" />
            </div>
          </form>
          <p className="login__register">
            If you don't have an account,&nbsp;
            <Link to="/register">Register here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
