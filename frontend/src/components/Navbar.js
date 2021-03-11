import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faSearch } from '@fortawesome/free-solid-svg-icons';
import logoYellow from '../assets/images/logo_yellow.png';
import { FormattedMessage } from 'react-intl';
import french from '../assets/icons/french.png';
import english from '../assets/icons/english.png';
import arabic from '../assets/icons/arabic.png';
import { useLanguageContext } from '../ContextAPI/LanguageProvider';
import { selectLanguageIcon } from '../util';
import axios from '../axios';

const Navbar = ({ navStore }) => {
  const [categories, setCategories] = useState([]);

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

  const [language, dispatch] = useLanguageContext();
  const languageImage = selectLanguageIcon(language);

  const changeLanguage = (language) => {
    localStorage.setItem('language', JSON.stringify({ language }));
    dispatch({ type: language, language });
  };

  const boxShadow = navStore ? '0 5px 5px rgba(0, 0, 0, 0.15)' : '';

  const navbarSearch = document.querySelector('.navbar__search');

  const displaySearch = () => {
    navbarSearch.style.top = '20px';
  };

  return (
    <nav className="navbar" style={{ boxShadow: boxShadow }}>
      <div className="navbar__up">
        <div className="navbar__left">
          <div className="navbar__title">
            <FontAwesomeIcon
              icon={faBars}
              className="menu"
              size="2x"
              onClick={() => handleClick()}
            />

            <img
              src={logoYellow}
              alt="logo"
              width="180px"
              className="d-sm-block d-none ml-3"
            />
          </div>

          <div className="navbar__center">
            <Link to="/">
              <FormattedMessage id="navbar.home" />
            </Link>
            <Link to="/about">
              <FormattedMessage id="navbar.about" />
            </Link>
            <Link to="/services">
              <FormattedMessage id="navbar.services" />
            </Link>
            <Link to="/store">
              <FormattedMessage id="navbar.store" />
            </Link>
          </div>
        </div>

        <img
          src={logoYellow}
          alt="logo"
          width="180px"
          className="responsive__logo d-sm-none"
        />

        <div className="navbar__right d-flex">
          {navStore && (
            <FontAwesomeIcon
              icon={faSearch}
              className="searchBtn mr-3"
              onClick={() => displaySearch()}
            />
          )}

          <form className="navbar__search">
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
          </form>

          <Link to="/login" className="navbar__linkLogin d-sm-inline d-none">
            <FormattedMessage id="navbar.login" />
          </Link>
          <Link to="/register" className="navbar__linkRegister">
            <FormattedMessage id="navbar.register" />
          </Link>

          <div className="navbar__language">
            <div className="dropdown">
              <div
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
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
