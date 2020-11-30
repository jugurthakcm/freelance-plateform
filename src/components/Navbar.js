import React, { useEffect } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  useEffect(() => {
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

  return (
    <nav className="navbar">
      <div className="navbar__title">
        <FontAwesomeIcon
          icon={faBars}
          className="d-md-none d-block"
          size="2x"
        />
        <h1 className="d-sm-block d-none">Handelp</h1>
      </div>
      <h1 className="d-sm-none">Handelp</h1>
      <div className="navbar__links">
        <div className="navbar__navLinks d-md-flex d-none">
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
