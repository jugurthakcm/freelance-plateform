import React from 'react';
import Main from '../components/Main';
import './Home.css';
import freelance from '../assets/images/logo512.png';
import { FormattedMessage } from 'react-intl';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import Service from '../components/Service';
import { services } from '../data/services';

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="home">
        <Main />
        <div className="home__description row justify-content-around">
          <div className="services px-4">
            <h1>
              <FormattedMessage id="services.title" />
            </h1>
            <div className="row">
              {services.map((service) => (
                <Service service={service} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
