import React from 'react';
import './Main.css';
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
        <div className="main__buttons">
          {/* <div className="main__searchBar">
            <FontAwesomeIcon icon={faSearch} />
            <FormattedMessage id="search.placeholder" defaultMessage="search">
              {(placeholder) => <input type="text" placeholder={placeholder} />}
            </FormattedMessage>
          </div> */}
          <button className="main__buttonStart">
            <FormattedMessage
              id="home.getStarted"
              defaultMessage="Get Started"
            />
          </button>
          <button className="main__buttonAbout">
            <FormattedMessage id="home.aboutUs" defaultMessage="About us" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Main;
