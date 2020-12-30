import React from 'react';
import './Login.css';
import login from '../assets/images/Login.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faHome } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { useLanguageContext } from '../ContextAPI/LanguageProvider';

const Login = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const language = useLanguageContext()[0];
  const leftAfter = language !== 'arabic' ? '0' : 'unset';
  const rightAfter = language === 'arabic' ? '0' : 'unset';

  return (
    <div className="login">
      <div className="login__container">
        <Link to="/" className="home__link">
          <FontAwesomeIcon icon={faHome} />
          <FormattedMessage id="login.home" />
        </Link>
        <img src={login} alt="login" width="400px" />
        <div className="login__form">
          <h2>
            <FormattedMessage id="login.title" />
            <div style={{ right: rightAfter, left: leftAfter }}></div>
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="login__email login__input">
              <FontAwesomeIcon icon={faEnvelope} />
              <FormattedMessage id="login.email" defaultMessage="Email">
                {(placeholder) => (
                  <input type="email" placeholder={placeholder} />
                )}
              </FormattedMessage>
            </div>
            <div className="login__password login__input">
              <FontAwesomeIcon icon={faLock} />
              <FormattedMessage id="login.password" defaultMessage="Password">
                {(placeholder) => (
                  <input type="password" placeholder={placeholder} />
                )}
              </FormattedMessage>
            </div>
            <label htmlFor="rememberMe" className="login__checkbox">
              <input type="checkbox" name="rememberMe" />
              <FormattedMessage id="login.rememberMe" />
            </label>
            <div className="login__submit">
              <p>
                <FormattedMessage id="login.forgetPassword" />
              </p>
              <button type="submit">
                <FormattedMessage id="login.button" />
              </button>
            </div>
          </form>
          <p className="login__register">
            <FormattedMessage id="login.footer.text" /> ,&nbsp;
            <Link to="/register">
              <FormattedMessage id="login.footer.link" />
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
