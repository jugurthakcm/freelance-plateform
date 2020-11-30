import React from 'react';
import './HomeComponent.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const HomeComponent = () => {
  return (
    <div className="main container-fluid">
      <div className="main__content col-md-12 pt-5">
        <h1 className="main__slogan">
          Find the perfect freelance <br />
          services for your business
        </h1>
        <div className="main__search">
          <div className="main__searchBar">
            <FontAwesomeIcon icon={faSearch} />
            <input type="text" placeholder="Search..." />
          </div>
          <button className="main__searchButton">Cherche</button>
        </div>
      </div>
    </div>
  );
};

export default HomeComponent;
