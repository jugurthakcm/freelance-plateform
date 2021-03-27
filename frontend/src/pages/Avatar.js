import React, { useState, useEffect } from 'react';
import axios from '../axios';
import api from '../api';
import Cropper from 'react-easy-crop';
import './Avatar.css';

const Avatar = () => {
  const [file, setFile] = useState('');
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   const formData = new FormData();
  //   formData.append('file', file);

  //   axios
  //     .post('/avatar', formData, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //         authorization: 'Bearer ' + localStorage.getItem('token'),
  //       },
  //     })
  //     .then((res) => console.log(res.data))
  //     .catch((err) => console.error(err.response));
  // };

  const onCropChange = (crop) => {};

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    console.log(croppedArea, croppedAreaPixels);
  };

  const onZoomChange = (zoom) => {};

  /* *********************************** */

  function readFile(file) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.addEventListener('load', () => resolve(reader.result), false);
      reader.readAsDataURL(file);
    });
  }

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    let imageDataUrl = await readFile(file);
    setImageSrc(imageDataUrl);
  };

  return (
    <>
      <form>
        <input type="file" name="avatar" onChange={handleFileSelect} />

        {imageSrc ? (
          <div className="cropContainer">
            <div className="imageCropContainer">
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={1 / 1}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
              />
            </div>
            <div className="crop__controls">
              <input
                type="range"
                name="zoom"
                min={1}
                max={3}
                step={0.1}
                value={zoom}
                onChange={(e) => setZoom(e.target.value)}
              />
              <div className="crop__controlsButtons">
                <button className="mr-2">Close</button>
                <button type="submit" className="ml-2">
                  Upload
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </form>
    </>
  );
};

export default Avatar;
