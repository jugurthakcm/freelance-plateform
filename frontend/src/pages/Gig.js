import React from 'react';
import './Gig.css';
import Navbar from '../components/Navbar';

const Gig = (props) => {
  const { gigId } = props.match.params;
  return (
    <>
      <Navbar />
      <div className="gigPage container">{gigId}</div>
    </>
  );
};

export default Gig;
