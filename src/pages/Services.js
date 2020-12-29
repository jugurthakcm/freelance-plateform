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

const Services = () => {
  const services = [
    {
      title: <FormattedMessage id="services.programmation" />,
      background: programmation,
      link: 'programmation',
    },
    {
      title: <FormattedMessage id="services.marketing" />,
      background: digitalMarketing,
      link: 'marketing',
    },
    {
      title: <FormattedMessage id="services.photography" />,
      background: photography,
      link: 'coaching',
    },
    {
      title: <FormattedMessage id="services.translation" />,
      background: translation,
      link: 'translation_redaction',
    },
    {
      title: <FormattedMessage id="services.voice" />,
      background: voice,
      link: 'voice',
    },
    {
      title: <FormattedMessage id="services.design" />,
      background: design,
      link: 'design',
    },
    {
      title: <FormattedMessage id="services.motion" />,
      background: motion,
      link: 'graphic_motion',
    },
    {
      title: <FormattedMessage id="services.architecture" />,
      background: architecture,
      link: 'architecture',
    },
  ];
  return (
    <>
      <Navbar />
      <div className="services px-4">
        <h1>Nos Services</h1>
        <div className="row">
          {services.map((service) => (
            // <Link
            //   to={{
            //     pathname: `/services/${service.link}`,
            //     aboutProps: { title: service.title },
            //   }}
            //   className="service__container col-lg-3 col-md-4 col-sm-6 p-2"
            // >
            //   <div
            //     className="service"
            //     style={{ backgroundColor: service.background }}
            //   >
            //     <h2>{service.title}</h2>
            //   </div>
            // </Link>
            <div className="service__container col-lg-3 col-md-4 col-sm-6 p-3">
              <div
                className="service"
                style={{ backgroundImage: `url(${service.background})` }}
              ></div>
              <h2>{service.title}</h2>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Services;
