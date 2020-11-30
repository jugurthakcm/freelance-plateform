import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>Handelp</h1>
      <div className="navbar__links">
        <Link to="/">A propos</Link>
        <Link to="/">Services</Link>
        <Link to="/">Store</Link>
        <div className="navbar__authLinks">
          <Link to="/">Connexion</Link>
          <Link to="/" className="navbar__linkRegister">
            Inscription
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
