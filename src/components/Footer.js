import React from 'react';
import './Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebook,
  faInstagram,
  faLinkedin,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import logoBlack from '../assets/images/logo_black.png';

const Footer = ({ aside }) => {
  const date = new Date();
  return (
    <div className={`footer ${aside && `aside__footer`}`}>
      <div className={`footer__left ${aside && `aside__footerLeft`}`}>
        {/* <h1 className="footer__title">Handelp</h1> */}
        <img
          src={logoBlack}
          alt="logo"
          width="150px"
          className="footer__title"
        />
        <p className="footer__copyright">
          © Tous droits réservés. Handelp. {date.getFullYear()}
        </p>
      </div>
      <div className="footer__right">
        <a href="/">
          <FontAwesomeIcon icon={faFacebook} className="footer__facebookIcon" />
        </a>
        <a href="/">
          <FontAwesomeIcon
            icon={faInstagram}
            className="footer__instagramIcon"
          />
        </a>
        <a href="/">
          <FontAwesomeIcon icon={faTwitter} className="footer__twitterIcon" />
        </a>
        <a href="/">
          <FontAwesomeIcon icon={faLinkedin} className="footer__linkdinIcon" />
        </a>
      </div>
    </div>
  );
};

export default Footer;
