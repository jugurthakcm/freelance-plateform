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
import { FormattedMessage } from 'react-intl';

const Footer = ({ aside }) => {
  const date = new Date();
  return (
    <div className={`footer ${aside && `aside__footer`}`}>
      <div className={`footer__left ${aside && `aside__footerLeft`}`}>
        <h1 className="footer__title">Freelancer</h1>
        <p className="footer__copyright">
          © <FormattedMessage id="footer.copyright" />. Freelancer.{' '}
          {date.getFullYear()}
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
