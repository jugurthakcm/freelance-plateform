import React from 'react';
import './Register.css';
import register from '../assets/images/Register.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope,
  faLock,
  faHome,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { useLanguageContext } from '../ContextAPI/LanguageProvider';

const Register = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const language = useLanguageContext()[0];
  const leftAfter = language !== 'arabic' ? '0' : 'unset';
  const rightAfter = language === 'arabic' ? '0' : 'unset';

  return (
    <div className="register">
      <div className="register__container">
        <Link to="/" className="home__link">
          <FontAwesomeIcon icon={faHome} />
          <FormattedMessage id="register.home" />
        </Link>
        <img src={register} alt="register" width="400px" />
        <div className="register__form">
          <h2>
            <FormattedMessage id="register.title" />
            <div style={{ right: rightAfter, left: leftAfter }}></div>
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="register__firstName register__input">
              <FontAwesomeIcon icon={faUser} />
              <FormattedMessage
                id="register.firstName"
                defaultMessage="First Name"
              >
                {(placeholder) => (
                  <input type="text" placeholder={placeholder} />
                )}
              </FormattedMessage>
            </div>

            <div className="register__lastName register__input">
              <FontAwesomeIcon icon={faUser} />
              <FormattedMessage
                id="register.lastName"
                defaultMessage="Last Name"
              >
                {(placeholder) => (
                  <input type="text" placeholder={placeholder} />
                )}
              </FormattedMessage>
            </div>

            <div className="register__email register__input">
              <FontAwesomeIcon icon={faEnvelope} />
              <FormattedMessage id="login.email" defaultMessage="Email">
                {(placeholder) => (
                  <input type="email" placeholder={placeholder} />
                )}
              </FormattedMessage>
            </div>

            <div className="register__password register__input">
              <FontAwesomeIcon icon={faLock} />
              <FormattedMessage
                id="register.password"
                defaultMessage="Password"
              >
                {(placeholder) => (
                  <input type="password" placeholder={placeholder} />
                )}
              </FormattedMessage>
            </div>

            <label htmlFor="rememberMe" className="register__checkbox">
              <input type="checkbox" name="rememberMe" />
              <FormattedMessage id="register.terms" />
            </label>
            <div className="register__submit">
              <Link to="/login">
                <FormattedMessage id="register.signIn" />
              </Link>
              <button type="submit">
                {' '}
                <FormattedMessage id="register.button" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
