import React, { useRef, useEffect } from 'react';
import './Aside.css';
import { NavLink, Link } from 'react-router-dom';
import Footer from './Footer';
import { FormattedMessage } from 'react-intl';

const Aside = () => {
  const asideLinks = [
    { title: 'home', link: '/' },
    { title: 'about', link: '/about' },
    { title: 'services', link: '/services' },
    { title: 'store', link: '/store' },
  ];

  const aside = useRef();

  const handleClick = () => {
    aside && aside.current.classList.add('aside__closed');
    aside && aside.current.classList.remove('aside__opened');
  };

  const handleClickOutside = (e) => {
    if (aside.current.contains(e.target)) {
      return;
    }
    aside.current.classList.add('aside__closed');
    aside.current.classList.remove('aside__opened');
  };

  useEffect(() => {
    aside && aside.current.classList.add('aside__closed');
    aside && aside.current.classList.remove('aside__opened');

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
              <FormattedMessage id={`navbar.${asideLink.title}`} />
            </NavLink>
          </li>
        ))}
      </ul>
      <div className="aside__auth">
        <Link to="/register" className="aside__register">
          <FormattedMessage id="navbar.register" />
        </Link>
        <Link to="/login" className="aside__login">
          <FormattedMessage id="navbar.login" />
        </Link>
      </div>
      <Footer aside={true} />
    </aside>
  );
};

export default Aside;
