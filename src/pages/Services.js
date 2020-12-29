import React from 'react';
import './Services.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Service from '../components/Service';
import { services } from '../data/services';

const Services = () => {
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
