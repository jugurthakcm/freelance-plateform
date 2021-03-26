import React, { useState, useEffect } from 'react';
import axios from '../axios';
import api from '../api';
import Cropper from 'react-easy-crop';
import './Avatar.css';

const Avatar = () => {
  const [file, setFile] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('file', file);

    axios
      .post('/avatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .then((res) => console.log(res.data))
      .catch((err) => console.error(err.response));
  };

  useEffect(() => {
    setImageCrop({
      image: api + 'uploads/AVATAR-1616775337731.jpeg',
      crop: { x: 0, y: 0 },
      zoom: 1,
      aspect: 1 / 1,
    });
  }, []);

  const [imageCrop, setImageCrop] = useState({
    crop: { x: 0, y: 0 },
    zoom: 1,
    aspect: 1 / 1,
  });

  const onCropChange = (crop) => {
    setImageCrop({ crop });
  };

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    console.log(croppedArea, croppedAreaPixels);
  };

  const onZoomChange = (zoom) => {
    setImageCrop({ zoom });
  };

  console.log(imageCrop.image, imageCrop.zoom);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          name="avatar"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <input type="submit" value="submit" />
      </form>
      <div className="cropImage d-none">
        <Cropper
          image={api + 'uploads/AVATAR-1616775337731.jpeg'}
          crop={imageCrop.crop}
          zoom={imageCrop.zoom}
          aspect={1 / 1}
          onCropChange={onCropChange}
          onCropComplete={onCropComplete}
          onZoomChange={onZoomChange}
        />
      </div>
    </>
  );
};

export default Avatar;
