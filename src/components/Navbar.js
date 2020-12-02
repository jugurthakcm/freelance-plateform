import React, { useEffect } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faSearch } from '@fortawesome/free-solid-svg-icons';
import logoYellow from '../assets/images/logo_yellow.png';
import { FormattedMessage } from 'react-intl';

const Navbar = () => {
  useEffect(() => {
    const header = document.querySelector('.navbar');
    const navSearch = document.querySelector('.navbar__search');

    window.addEventListener('scroll', () => {
      header && window.scrollY > 0
        ? header.classList.add('navbar__sticky')
        : header.classList.remove('navbar__sticky');
      navSearch && window.scrollY > 0
        ? navSearch.classList.remove('d-none')
        : navSearch.classList.add('d-none');
    });

    header && window.scrollY > 0
      ? header.classList.add('navbar__sticky')
      : header.classList.remove('navbar__sticky');
    navSearch && window.scrollY > 0
      ? navSearch.classList.remove('d-none')
      : navSearch.classList.add('d-none');
  }, []);

  const handleClick = () => {
    const aside = document.getElementsByClassName('aside')[0];
    aside.classList.add('aside__opened');
    aside.classList.remove('aside__closed');
  };

  return (
    <nav className="navbar">
      <div className="navbar__title">
        <FontAwesomeIcon
          icon={faBars}
          className="d-md-none d-block"
          size="2x"
          onClick={() => handleClick()}
        />
        {/*  <h1 className="d-sm-block d-none">Handelp</h1> */}
        <img
          src={logoYellow}
          alt="logo"
          width="200px"
          className="d-sm-block d-none"
        />
      </div>
      {/* <h1 className="d-sm-none">Handelp</h1> */}
      <img
        src={logoYellow}
        alt="logo"
        width="200px"
        className="responsive__logo d-sm-none"
      />
      <div className="navbar__search d-none">
        <div className="navbar__searchBar">
          <FontAwesomeIcon icon={faSearch} />
          <FormattedMessage id="search.placeholder" defaultMessage="search">
            {(placeholder) => <input type="text" placeholder={placeholder} />}
          </FormattedMessage>
        </div>
        <button className="navbar__searchButton">
          <FormattedMessage id="search.button" />
        </button>
      </div>
      <div className="navbar__links">
        <div className="navbar__navLinks d-md-flex d-none">
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
        <div className="navbar__authLinks">
          <Link to="/" className="d-sm-inline d-none">
            <FormattedMessage id="navbar.login" />
          </Link>
          <Link to="/" className="navbar__linkRegister">
            <FormattedMessage id="navbar.register" />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
