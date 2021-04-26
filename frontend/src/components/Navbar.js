import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faSearch,
  faTimesCircle,
} from '@fortawesome/free-solid-svg-icons';
import { faBell, faCommentAlt } from '@fortawesome/free-regular-svg-icons';
import logoYellow from '../assets/images/logo_yellow.png';
import { FormattedMessage } from 'react-intl';
import french from '../assets/icons/french.png';
import english from '../assets/icons/english.png';
import arabic from '../assets/icons/arabic.png';
import { useLanguageContext } from '../ContextAPI/LanguageProvider';
import { selectLanguageIcon } from '../util';
import axios from '../axios';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../data/actions/userActions';
import avatar from '../assets/images/avatar.jpg';
import api from '../api';

const Navbar = ({ navStore }) => {
  const [categories, setCategories] = useState([]);
  const user = useSelector((state) => state.user);
  const u = user.user;

  useEffect(() => {
    axios
      .get('/categories/')
      .then((data) => setCategories(data.data))
      .catch((err) => console.error(err));

    const header = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
      header && window.scrollY > 0
        ? header.classList.add('navbar__sticky')
        : header.classList.remove('navbar__sticky');
    });

    header && window.scrollY > 0
      ? header.classList.add('navbar__sticky')
      : header.classList.remove('navbar__sticky');
  }, []);

  const handleClick = () => {
    const aside = document.getElementsByClassName('aside')[0];
    aside.classList.add('aside__opened');
    aside.classList.remove('aside__closed');
  };

  const [language, dispatchLanguage] = useLanguageContext();
  const languageImage = selectLanguageIcon(language);

  const changeLanguage = (language) => {
    localStorage.setItem('language', JSON.stringify({ language }));
    dispatchLanguage({ type: language, language });
  };

  const boxShadow = navStore ? '0 5px 5px rgba(0, 0, 0, 0.15)' : '';

  const navbarSearch = document.querySelector('.navbar__search');

  const displaySearch = () => {
    navbarSearch.style.top = '20px';
  };

  const closeSearch = () => {
    navbarSearch.style.top = '-100px';
  };

  const dispatch = useDispatch();

  return (
    <nav className="navbar container-fluid" style={{ boxShadow: boxShadow }}>
      <div className="navbar__up">
        <div className="navbar__left">
          <div className="navbar__title">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="35"
              height="35"
              fill="black"
              class="bi bi-list"
              viewBox="0 0 16 16"
              onClick={() => handleClick()}
              className="menu"
            >
              <path
                fill-rule="evenodd"
                d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
              />
            </svg>

            <h1>Freelancer</h1>
          </div>

          <div className="navbar__center">
            <Link to="/">
              <FormattedMessage id="navbar.home" />
            </Link>
            <Link to="/store">
              <FormattedMessage id="navbar.explore" />
            </Link>
            <Link to="/">Find Work</Link>
            <Link to="/">About Us</Link>
          </div>
        </div>

        <img
          src={logoYellow}
          alt="logo"
          width="180px"
          className="responsive__logo d-sm-none"
        />

        <div className="navbar__right d-flex">
          {/* {navStore && (
            <FontAwesomeIcon
              icon={faSearch}
              className="searchBtn mr-3"
              onClick={() => displaySearch()}
            />
          )} */}

          {/* <form className="navbar__search">
            <FontAwesomeIcon
              icon={faSearch}
              className="searchBtn__input mr-3"
            />
            <input
              type="text"
              name="search"
              placeholder="Search..."
              id="searchInput"
            />

            <FontAwesomeIcon
              icon={faTimesCircle}
              className="ml-3"
              onClick={() => closeSearch()}
            />
          </form> */}
          {!user.isLoading && (
            <>
              <div className="navbar__language me-3">
                <div className="dropdown">
                  <div
                    id="dropdownMenuButton"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{ backgroundImage: `url(${languageImage})` }}
                  ></div>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton"
                  >
                    <li
                      className="dropdown-item"
                      onClick={() => changeLanguage('french')}
                    >
                      <img src={french} alt="french" /> Français
                    </li>
                    <li
                      className="dropdown-item"
                      onClick={() => changeLanguage('english')}
                    >
                      <img src={english} alt="english" /> English
                    </li>
                    <li
                      className="dropdown-item"
                      onClick={() => changeLanguage('arabic')}
                    >
                      <img src={arabic} alt="arabic" />
                      العربية
                    </li>
                  </ul>
                </div>
              </div>
              {user.user ? (
                <div className="navbar__user">
                  <FontAwesomeIcon icon={faBell} size="lg" className="me-3" />
                  <Link to="/chat">
                    <FontAwesomeIcon
                      icon={faCommentAlt}
                      size="lg"
                      className="me-3"
                    />
                  </Link>
                  <div className="dropdown">
                    <div
                      className="dropdown-toggle"
                      id="dropdownMenuButton"
                      data-toggle="dropdown"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      // style={{ backgroundImage: `url(${languageImage})` }}
                    >
                      {u && u.imageURI ? (
                        <img
                          src={api + '/uploads/avatars/' + u.imageURI}
                          alt="avatar"
                          width="30px"
                          style={{ borderRadius: '50%', cursor: 'pointer' }}
                        />
                      ) : (
                        <img
                          src={avatar}
                          alt="avatar"
                          width="30px"
                          style={{ borderRadius: '50%', cursor: 'pointer' }}
                        />
                      )}
                    </div>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton"
                    >
                      <li className="dropdown-item">
                        <Link to="/dashboard">Dashboard</Link>
                      </li>
                      <li className="dropdown-item">
                        <Link to="/settings">Settings</Link>
                      </li>
                      <li className="dropdown-item">Upgrade</li>
                      <li
                        className="dropdown-item"
                        onClick={() => dispatch(logoutUser())}
                      >
                        Logout
                      </li>
                    </ul>
                  </div>
                </div>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="navbar__linkLogin d-sm-inline d-none"
                  >
                    <FormattedMessage id="navbar.login" />
                  </Link>
                  <Link to="/register" className="navbar__linkRegister">
                    <FormattedMessage id="navbar.register" />
                  </Link>
                </>
              )}
            </>
          )}
        </div>
      </div>
      {navStore && (
        <div className="navbar__down">
          {categories.map((category) => (
            <p key={category._id}>{category.title.toUpperCase()}</p>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
