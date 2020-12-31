import React from 'react';
import Main from '../components/Main';
import './Home.css';
import freelance from '../assets/images/logo512.png';
import { FormattedMessage } from 'react-intl';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useLanguageContext } from '../ContextAPI/LanguageProvider';

const Home = () => {
  const language = useLanguageContext()[0];
  const rightText = language === 'arabic' ? 'right' : 'left';
  const leftAfter = language !== 'arabic' ? '20px' : 'unset';
  const rightAfter = language === 'arabic' ? '20px' : 'unset';

  return (
    <>
      <Navbar />
      <div className="home">
        <Main />
        <div className="home__description row justify-content-around">
          <div className="description__text col-lg-7 ">
            <h1
              style={{
                textAlign: rightText,
              }}
            >
              <FormattedMessage id="description.descriptionTitle" />
              <div style={{ right: rightAfter, left: leftAfter }}></div>
            </h1>
            <p className="mt-4" style={{ textAlign: rightText }}>
              <FormattedMessage id="description.descriptionText" />
            </p>
          </div>

          <img
            src={freelance}
            alt="description"
            className="description__image col-lg-5"
            style={{ maxWidth: 400 }}
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
