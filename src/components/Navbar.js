import React, { useEffect } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faSearch } from '@fortawesome/free-solid-svg-icons';
import logoYellow from '../assets/images/logo_yellow.png';

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

  return (
    <nav className="navbar">
      <div className="navbar__title">
        <FontAwesomeIcon
          icon={faBars}
          className="d-md-none d-block"
          size="2x"
        />
        {/*  <h1 className="d-sm-block d-none">Handelp</h1> */}
        <img
          src={logoYellow}
          alt="logo"
          width="150px"
          className="d-sm-block d-none"
        />
      </div>
      {/* <h1 className="d-sm-none">Handelp</h1> */}
      <img
        src={logoYellow}
        alt="logo"
        width="150px"
        className="responsive__logo d-sm-none"
      />
      <div className="navbar__search d-none">
        <div className="navbar__searchBar">
          <FontAwesomeIcon icon={faSearch} />
          <input type="text" placeholder="Chercher..." />
        </div>
        <button className="navbar__searchButton">Chercher</button>
      </div>
      <div className="navbar__links">
        <div className="navbar__navLinks d-md-flex d-none">
          <Link to="/">Acceuil</Link>
          <Link to="/">A propos</Link>
          <Link to="/">Services</Link>
          <Link to="/">Store</Link>
        </div>
        <div className="navbar__authLinks">
          <Link to="/" className="d-sm-inline d-none">
            Connexion
          </Link>
          <Link to="/" className="navbar__linkRegister">
            Inscription
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
