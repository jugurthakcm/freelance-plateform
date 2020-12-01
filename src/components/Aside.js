import React, { useRef, useEffect } from 'react';
import './Aside.css';
import { NavLink, Link } from 'react-router-dom';
import Footer from './Footer';

const Aside = () => {
  const asideLinks = [
    { title: 'Acceuil', link: '/' },
    { title: 'A Propos', link: '/' },
    { title: 'Services', link: '/' },
    { title: 'Store', link: '/' },
  ];

  const aside = useRef();

  const handleClick = () => {
    aside.current.classList.add('aside__closed');
    aside.current.classList.remove('aside__opened');
  };

  const handleClickOutside = (e) => {
    if (aside && aside.current.contains(e.target)) {
      return;
    }
    aside.current.classList.add('aside__closed');
    aside.current.classList.remove('aside__opened');
  };

  useEffect(() => {
    aside.current.classList.add('aside__closed');
    aside.current.classList.remove('aside__opened');

    document.addEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <aside
      ref={aside}
      className="aside d-flex flex-column justify-content-between aside__closed"
    >
      <button
        type="button"
        className="close mr-3 mt-1"
        aria-label="Close"
        onClick={() => handleClick()}
      >
        <span>&times;</span>
      </button>
      <ul className="d-flex flex-column aside__links">
        {asideLinks.map((asideLink) => (
          <li className="aside__item" key={asideLink.link}>
            <NavLink
              exact
              to={asideLink.link}
              className="aside__link"
              onClick={handleClick}
            >
              {asideLink.title}
            </NavLink>
          </li>
        ))}
      </ul>
      <div className="aside__auth">
        <Link className="aside__register">Rejoignez-nous</Link>
        <Link className="aside__login">Connectez-vous</Link>
      </div>
      <Footer aside={true} />
    </aside>
  );
};

export default Aside;
