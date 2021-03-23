import React, { useEffect } from 'react';
import './Login.css';
import login from '../assets/images/Login.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faHome } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { useLanguageContext } from '../ContextAPI/LanguageProvider';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../data/actions/userActions';
import { useHistory } from 'react-router-dom';

const Login = () => {
  const language = useLanguageContext()[0];
  const leftAfter = language !== 'arabic' ? '0' : 'unset';
  const rightAfter = language === 'arabic' ? '0' : 'unset';

  const schema = Joi.object({
    email: Joi.string()
      .trim()
      .email({ tlds: { allow: false } })
      .required(),
    password: Joi.string().trim().required().min(8),
  });

  const { register, handleSubmit, errors } = useForm({
    resolver: joiResolver(schema),
  });

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const submitForm = (e) => {
    dispatch(loginUser(e));
  };

  const history = useHistory();
  useEffect(() => {
    if (user.token) history.push('/dashboard');
  }, [user, history]);

  const e = user.error;

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

          <form onSubmit={handleSubmit(submitForm)}>
            <div className="login__inputForm">
              <div
                className={`login__email login__input ${
                  errors.email || (e && e.fieldLogin === 'email')
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
              {e && e.fieldLogin === 'email' && (
                <p className="textError">{e.error}</p>
              )}
            </div>

            <div className="login__inputForm">
              <div
                className={`login__password login__input ${
                  errors.password || (e && e.fieldLogin === 'password')
                    ? 'inputError'
                    : null
                }`}
              >
                <FontAwesomeIcon icon={faLock} />
                <FormattedMessage id="login.password" defaultMessage="Password">
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
              {e && e.fieldLogin === 'password' && (
                <p className="textError">{e.error}</p>
              )}
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
