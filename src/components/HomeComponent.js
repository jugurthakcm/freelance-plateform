import React from 'react';
import './HomeComponent.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import BackgroundSlider from 'react-background-slider';
import Home1 from '../assets/images/Home1.jpg';
import Home2 from '../assets/images/Home2.jpg';
import Home3 from '../assets/images/Home3.jpg';

const HomeComponent = () => {
  return (
    <div className="main">
      <BackgroundSlider
        images={[Home1, Home2, Home3]}
        duration={4}
        transition={0.5}
      />
      <div className="main__content pl-3 pr-4 pt-5">
        <h1 className="main__slogan">
          Hand it the right freelance.
          <br />
          We are the solution
        </h1>
        <div className="main__search">
          <div className="main__searchBar">
            <FontAwesomeIcon icon={faSearch} />
            <input type="text" placeholder="Chercher..." />
          </div>
          <button className="main__searchButton">Chercher</button>
        </div>
      </div>
    </div>
  );
};

export default HomeComponent;
