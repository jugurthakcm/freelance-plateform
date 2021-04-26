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
    if (aside && aside.current.contains(e.target)) {
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
    <aside ref={aside} className="aside aside__closed">
      <div className="close__container">
        <button
          type="button"
          className="btn-close me-2"
          aria-label="Close"
          onClick={handleClick}
        ></button>
      </div>
      <ul className="aside__links">
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
        <Link to="/register" className="aside__register" onClick={handleClick}>
          <FormattedMessage id="navbar.register" />
        </Link>
        <Link to="/login" className="aside__login" onClick={handleClick}>
          <FormattedMessage id="navbar.login" />
        </Link>
      </div>
    </aside>
  );
};

export default Aside;
