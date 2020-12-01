import React from 'react';
import './Service.css';

const Service = ({ title, background }) => {
  const handleMouseOver = (e) => {
    e.target.innerHTML =
      '<p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero dolore quiincidunt provident deleniti omnis alias consequatur est fugit voluptas.</p>';
  };

  const handleMouseLeave = (e) => {
    e.target.innerHTML = `<h2>${title}</h2>`;
  };

  const handleClick = (e) => {
    e.target.innerHTML =
      '<p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero dolore quiincidunt provident deleniti omnis alias consequatur est fugit voluptas.</p>';
  };

  return (
    <div className="service__container col-lg-3 col-md-4 col-sm-6 p-2">
      <div
        className="service"
        style={{ backgroundColor: background }}
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        <h2>{title}</h2>
      </div>
    </div>
  );
};

export default Service;
