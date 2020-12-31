import React from 'react';
import './Register.css';
import registerImg from '../assets/images/Register.png';
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
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';

const Register = () => {
  const language = useLanguageContext()[0];
  const leftAfter = language !== 'arabic' ? '0' : 'unset';
  const rightAfter = language === 'arabic' ? '0' : 'unset';

  const schema = Joi.object({
    fullName: Joi.string().trim().max(30).required(),
    username: Joi.string().trim().max(30).required(),
    email: Joi.string()
      .trim()
      .email({ tlds: { allow: false } })
      .required(),
    password: Joi.string().trim().required().min(8),
    confirmPassword: Joi.ref('password'),
  });

  const { register, handleSubmit, errors } = useForm({
    resolver: joiResolver(schema),
  });

  const submitForm = (e) => {};

  return (
    <div className="register">
      <div className="register__container">
        <Link to="/" className="home__link">
          <FontAwesomeIcon icon={faHome} />
          <FormattedMessage id="register.home" />
        </Link>
        <img src={registerImg} alt="register" width="400px" />
        <div className="register__form">
          <h2>
            <FormattedMessage id="register.title" />
            <div style={{ right: rightAfter, left: leftAfter }}></div>
          </h2>
          <form onSubmit={handleSubmit(submitForm)}>
            <div className="register__inputForm">
              <div className="register__fullName register__input">
                <FontAwesomeIcon icon={faUser} />
                <FormattedMessage
                  id="register.fullName"
                  defaultMessage="Full Name"
                >
                  {(placeholder) => (
                    <input
                      type="text"
                      placeholder={placeholder}
                      ref={register}
                      name="fullName"
                    />
                  )}
                </FormattedMessage>
              </div>
              {errors.fullName && (
                <p className="textError">{errors.fullName?.message}</p>
              )}
            </div>

            <div className="register__inputForm">
              <div className="register_username register__input">
                <FontAwesomeIcon icon={faUser} />
                <FormattedMessage
                  id="register.username"
                  defaultMessage="Username"
                >
                  {(placeholder) => (
                    <input
                      type="text"
                      placeholder={placeholder}
                      ref={register}
                      name="username"
                    />
                  )}
                </FormattedMessage>
              </div>
              {errors.username && (
                <p className="textError">{errors.username?.message}</p>
              )}
            </div>

            <div className="register__inputForm">
              <div className="register__email register__input">
                <FontAwesomeIcon icon={faEnvelope} />
                <FormattedMessage id="login.email" defaultMessage="Email">
                  {(placeholder) => (
                    <input
                      type="email"
                      placeholder={placeholder}
                      ref={register}
                      name="email"
                    />
                  )}
                </FormattedMessage>
              </div>
              {errors.email && (
                <p className="textError">{errors.email?.message}</p>
              )}
            </div>

            <div className="register__phone">
              <label>
                <FormattedMessage id="register.phone" />
              </label>
              <PhoneInput country={'dz'} />
            </div>

            <div className="register__inputForm">
              <div className="register__password register__input">
                <FontAwesomeIcon icon={faLock} />
                <FormattedMessage
                  id="register.password"
                  defaultMessage="Password"
                >
                  {(placeholder) => (
                    <input
                      type="password"
                      placeholder={placeholder}
                      ref={register}
                      name="password"
                    />
                  )}
                </FormattedMessage>
              </div>
              {errors.password && (
                <p className="textError">{errors.password?.message}</p>
              )}
            </div>

            <div className="register__inputForm">
              <div className="register__password register__input">
                <FontAwesomeIcon icon={faLock} />
                <FormattedMessage
                  id="register.confirmPassword"
                  defaultMessage="Confirm password"
                >
                  {(placeholder) => (
                    <input
                      type="password"
                      placeholder={placeholder}
                      ref={register}
                      name="confirmPassword"
                    />
                  )}
                </FormattedMessage>
              </div>
              {errors.confirmPassword && (
                <p className="textError">The passwords must be equal</p>
              )}
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
