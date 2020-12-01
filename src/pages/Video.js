import React, { useEffect } from 'react';
import Handelp from '../assets/videos/Handelp.mp4';
import './Video.css';

const Video = () => {
  useEffect(() => {
    document.querySelector('video').play();
  }, []);

  return (
    <div className="video__container">
      <video autoplay src={Handelp} type="video/mp4" />
    </div>
  );
};

export default Video;
