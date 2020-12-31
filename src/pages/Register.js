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
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const Register = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const language = useLanguageContext()[0];
  const leftAfter = language !== 'arabic' ? '0' : 'unset';
  const rightAfter = language === 'arabic' ? '0' : 'unset';

  // console.log(FetchCountries());
  // const countries = FetchCountries();

  // const handleChangePhone = () => {
  //   var countrycode = document.getElementById('countrycode');
  //   countrycode.options[countrycode.selectedIndex].text =
  //     '+' + countrycode.value;
  // };

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
            <div className="register__fullName register__input">
              <FontAwesomeIcon icon={faUser} />
              <FormattedMessage
                id="register.fullName"
                defaultMessage="Full Name"
              >
                {(placeholder) => (
                  <input type="text" placeholder={placeholder} />
                )}
              </FormattedMessage>
            </div>

            <div className="register_username register__input">
              <FontAwesomeIcon icon={faUser} />
              <FormattedMessage
                id="register.username"
                defaultMessage="Username"
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

            <div className="register__phone">
              <label>
                <FormattedMessage id="register.phone" />
              </label>
              <PhoneInput country={'dz'} />
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

            <div className="register__password register__input">
              <FontAwesomeIcon icon={faLock} />
              <FormattedMessage
                id="register.confirmPassword"
                defaultMessage="Confirm password"
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
