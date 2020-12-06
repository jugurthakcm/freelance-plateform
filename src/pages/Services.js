import React from 'react';
import './Services.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const Services = () => {
  const services = [
    {
      title: 'Programmation et Développement',
      background: '#0a043c',
      link: 'programmation',
    },
    { title: 'Business', background: '#583d72', link: 'business' },
    { title: 'Marketing', background: '#682c0e', link: 'marketing' },
    { title: 'Coaching', background: '#222831', link: 'coaching' },
    {
      title: 'Traduction et Rédaction',
      background: '#16697a',
      link: 'translation_redaction',
    },
    { title: 'Voice', background: '#222831', link: 'voice' },
    { title: 'Design', background: '#393e46', link: 'design' },
    { title: 'Montage Vidéo', background: '#ea2c62', link: 'graphic_motion' },
  ];
  return (
    <>
      <Navbar />
      <div className="services px-4">
        <h1>Nos Services</h1>
        <div className="row">
          {services.map((service) => (
            <Link
              to={{
                pathname: `/services/${service.link}`,
                aboutProps: { title: service.title },
              }}
              className="service__container col-lg-3 col-md-4 col-sm-6 p-2"
            >
              <div
                className="service"
                style={{ backgroundColor: service.background }}
              >
                <h2>{service.title}</h2>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Services;
