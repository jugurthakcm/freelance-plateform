import React from 'react';

const ServiceList = (props) => {
  const { list, forwardRef } = props;

  const handleClick = () => {
    forwardRef.current.classList.add('d-none');
  };

  return (
    <div className="service__listContainer">
      <div className="service__list">
        <button type="button" className="close" onClick={handleClick}>
          &times;
        </button>
        {list.map((item) => (
          <span>{item}</span>
        ))}
      </div>
    </div>
  );
};

export default ServiceList;
