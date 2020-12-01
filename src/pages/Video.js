import React from 'react';
import Handelp from '../assets/videos/Handelp.gif';
import './Video.css';

const Video = () => {
  return (
    <div className="video__container">
      <img src={Handelp} alt="hand" />
    </div>
  );
};

export default Video;
