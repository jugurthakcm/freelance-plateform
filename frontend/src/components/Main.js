import React from 'react';
import './Main.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import BackgroundSlider from 'react-background-slider';
import Home1 from '../assets/images/Home1.jpg';
import Home2 from '../assets/images/Home2.jpg';
import Home3 from '../assets/images/Home3.jpg';
import { FormattedMessage } from 'react-intl';

const Main = () => {
  return (
    <div className="main">
      <BackgroundSlider
        images={[Home1, Home2, Home3]}
        duration={4}
        transition={0.5}
      />
      <div className="main__content col-md-12 pl-3 pr-4">
        <h1 className="main__slogan">
          Hand it to the right freelance.
          <br />
          We are the solution
        </h1>
        <div className="main__search">
          <div className="main__searchBar">
            <FontAwesomeIcon icon={faSearch} />
            <FormattedMessage id="search.placeholder" defaultMessage="search">
              {(placeholder) => <input type="text" placeholder={placeholder} />}
            </FormattedMessage>
          </div>
          <button className="main__searchButton">
            <FormattedMessage id="search.button" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Main;
