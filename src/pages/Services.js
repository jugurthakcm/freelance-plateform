import React from 'react';
import './Services.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
// import { Link } from 'react-router-dom';
import programmation from '../assets/images/programmation.jpg';
import digitalMarketing from '../assets/images/digitalMarketing.jpg';
import photography from '../assets/images/photography.jpg';
import translation from '../assets/images/translation.jpg';
import design from '../assets/images/design.jpg';
import motion from '../assets/images/motion.jpeg';
import voice from '../assets/images/voice.jpg';
import architecture from '../assets/images/architecture.jpg';
import { FormattedMessage } from 'react-intl';
import Service from '../components/Service';

const Services = () => {
  const services = [
    {
      title: <FormattedMessage id="services.programmation" />,
      background: programmation,
      list: ['programmation'],
    },
    {
      title: <FormattedMessage id="services.marketing" />,
      background: digitalMarketing,
      list: ['digitalMark'],
    },
    {
      title: <FormattedMessage id="services.photography" />,
      background: photography,
      list: ['hello'],
    },
    {
      title: <FormattedMessage id="services.translation" />,
      background: translation,
      list: ['hello'],
    },
    {
      title: <FormattedMessage id="services.voice" />,
      background: voice,
      list: ['hello'],
    },
    {
      title: <FormattedMessage id="services.design" />,
      background: design,
      list: ['hello'],
    },
    {
      title: <FormattedMessage id="services.motion" />,
      background: motion,
      list: ['hello'],
    },
    {
      title: <FormattedMessage id="services.architecture" />,
      background: architecture,
      list: ['architec'],
    },
  ];
  return (
    <>
      <Navbar />
      <div className="services px-4">
        <h1>Nos Services</h1>
        <div className="row">
          {services.map((service) => (
            <Service service={service} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Services;
