import React, { useRef } from 'react';
import './Service.css';
import ServiceList from './ServiceList';

const Service = ({ service }) => {
  const ref = useRef();
  const handleClick = () => {
    ref.current.classList.remove('d-none');
  };

  return (
    <div className="service__container col-lg-3 col-md-4 col-sm-6 p-3">
      <div
        className="service"
        style={{ backgroundImage: `url(${service.background})` }}
        onClick={handleClick}
      ></div>

      <h2 onClick={handleClick}>{service.title}</h2>
      <div ref={ref} className="d-none">
        <ServiceList list={service.list} forwardRef={ref} />
      </div>
    </div>
  );
};

export default Service;
