import React from 'react';
import Handelp from '../assets/videos/NewGif.gif';
import './Video.css';

const Video = () => {
  return (
    <div className="video__container">
      <img src={Handelp} alt="hand" />
    </div>
  );
};

export default Video;
