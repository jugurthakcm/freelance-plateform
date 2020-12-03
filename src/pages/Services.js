import React from 'react';
import Service from '../components/Service';
import './Services.css';

const Services = () => {
  const services = [
    { title: 'Programmation et Développement', background: '#0a043c' },
    { title: 'Business', background: '#583d72' },
    { title: 'Marketing', background: '#682c0e' },
    { title: 'Coaching', background: '#222831' },
    { title: 'Traduction et Rédaction', background: '#16697a' },
    { title: 'Voice', background: '#222831' },
    { title: 'Design', background: '#393e46' },
    { title: 'Montage Vidéo', background: '#ea2c62' },
  ];
  return (
    <div className="services px-4">
      <h1>Nos Services</h1>
      <div className="row">
        {services.map((service) => (
          <Service title={service.title} background={service.background} />
        ))}
      </div>
    </div>
  );
};

export default Services;
