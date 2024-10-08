import React, { useState, useEffect } from 'react';
import './Register.css';
import registerImg from '../assets/images/Register.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope,
  faLock,
  faHome,
  faUser,
  faUserTag,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { useLanguageContext } from '../ContextAPI/LanguageProvider';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../data/actions/userActions';
import { useHistory } from 'react-router-dom';

const Register = () => {
  const language = useLanguageContext()[0];
  const leftAfter = language !== 'arabic' ? '0' : 'unset';
  const rightAfter = language === 'arabic' ? '0' : 'unset';

  const schema = Joi.object({
    firstName: Joi.string().trim().min(2).max(30).required(),
    lastName: Joi.string().trim().min(2).max(30).required(),
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

  const [phone, setPhone] = useState('');

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const submitForm = (e) => {
    dispatch(registerUser(e, phone));
  };

  const history = useHistory();
  useEffect(() => {
    if (user.token) history.push('/dashboard');
  }, [user, history]);

  const e = user.error;

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
              <div
                className={`register__firstName register__input ${
                  errors.firstName || (e && e.field === 'firstName')
                    ? 'inputError'
                    : null
                }`}
              >
                <FontAwesomeIcon icon={faUser} />
                <FormattedMessage
                  id="register.firstName"
                  defaultMessage="First Name"
                >
                  {(placeholder) => (
                    <input
                      type="text"
                      placeholder={placeholder}
                      ref={register}
                      name="firstName"
                    />
                  )}
                </FormattedMessage>
              </div>
              {errors.firstName && (
                <p className="textError">{errors.firstName?.message}</p>
              )}
              {e && e.field === 'firstName' && (
                <p className="textError">{e.error}</p>
              )}
            </div>

            <div className="register__inputForm">
              <div
                className={`register__lastName register__input ${
                  errors.lastName || (e && e.field === 'lastName')
                    ? 'inputError'
                    : null
                }`}
              >
                <FontAwesomeIcon icon={faUser} />
                <FormattedMessage
                  id="register.lastName"
                  defaultMessage="Last Name"
                >
                  {(placeholder) => (
                    <input
                      type="text"
                      placeholder={placeholder}
                      ref={register}
                      name="lastName"
                    />
                  )}
                </FormattedMessage>
              </div>
              {errors.lastName && (
                <p className="textError">{errors.lastName?.message}</p>
              )}
              {e && e.field === 'lastName' && (
                <p className="textError">{e.error}</p>
              )}
            </div>

            <div className="register__inputForm">
              <div
                className={`register_username register__input ${
                  errors.username || (e && e.field === 'username')
                    ? 'inputError'
                    : null
                }`}
              >
                <FontAwesomeIcon icon={faUserTag} />
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
              {e && e.field === 'username' && (
                <p className="textError">{e.error}</p>
              )}
            </div>

            <div className="register__inputForm">
              <div
                className={`register__email register__input ${
                  errors.email || (e && e.field === 'email')
                    ? 'inputError'
                    : null
                }`}
              >
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
              {e && e.field === 'email' && (
                <p className="textError">{e.error}</p>
              )}
            </div>

            <div className="register__phone">
              <label>
                <FormattedMessage id="register.phone" />
              </label>
              <div
                className={`${e && e.field === 'phone' ? 'inputError' : null}`}
                style={{ borderRadius: '7px' }}
              >
                <PhoneInput
                  country={'dz'}
                  name="phone"
                  onChange={(e) => setPhone('+' + e)}
                />
              </div>
              {e && e.field === 'phone' && (
                <p className="textError">{e.error}</p>
              )}
            </div>

            <div className="register__inputForm">
              <div
                className={`register__password register__input ${
                  errors.password || (e && e.field === 'password')
                    ? 'inputError'
                    : null
                }`}
              >
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
              {e && e.field === 'password' && (
                <p className="textError">{e.error}</p>
              )}
            </div>

            {/* <div className="register__inputForm">
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
            </div> */}

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
