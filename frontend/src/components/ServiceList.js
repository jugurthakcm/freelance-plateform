import React from 'react';

const ServiceList = (props) => {
  const { list, forwardRef } = props;

  const handleClick = () => {
    forwardRef.current.classList.add('d-none');
  };

  return (
    <div className="service__listContainer">
      <div className="service__list col-11">
        <button
          type="button"
          className="btn-close"
          aria-label="Close"
          onClick={handleClick}
        ></button>
        {list.map((item) => (
          <span>{item}</span>
        ))}
      </div>
    </div>
  );
};

export default ServiceList;
