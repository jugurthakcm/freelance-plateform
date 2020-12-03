import React from 'react';
import Main from '../components/Main';
import './Home.css';
import freelance from '../assets/images/Description.jpg';
import { FormattedMessage } from 'react-intl';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="home">
        <Main />
        <div className="home__description row">
          <div className="description__text col-lg-6 ">
            <h1>
              <FormattedMessage id="description.descriptionTitle" />
            </h1>
            <p className="mt-4">
              <FormattedMessage id="description.descriptionText" />
            </p>
          </div>

          <img
            src={freelance}
            alt="description"
            className="description__image col-lg-6"
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
