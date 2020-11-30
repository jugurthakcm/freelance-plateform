import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import menu from '../assets/icons/menu.png';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar__title">
        <img
          src={menu}
          alt="menu"
          width="30px"
          height="30px"
          className="d-md-none d-block"
        />
        <h1>Handelp</h1>
      </div>
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
