import React from 'react';
import './HomeComponent.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const HomeComponent = () => {
  return (
    <div className="main">
      <div className="main__content col-md-12 pt-5">
        <h1 className="main__slogan">
          Hand it the right freelance.
          <br />
          We are the solution
        </h1>
        <div className="main__search">
          <div className="main__searchBar">
            <FontAwesomeIcon icon={faSearch} />
            <input type="text" placeholder="Search..." />
          </div>
          <button className="main__searchButton">Chercher</button>
        </div>
      </div>
    </div>
  );
};

export default HomeComponent;
