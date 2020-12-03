import React from 'react';
import './Service.css';

const Service = ({ title, background }) => {
  return (
    <div className="service__container col-lg-3 col-md-4 col-sm-6 p-2">
      <div className="service" style={{ backgroundColor: background }}>
        <h2>{title}</h2>
      </div>
    </div>
  );
};

export default Service;
