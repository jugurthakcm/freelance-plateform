import React, { useState, useRef, useEffect } from 'react';
import axios from '../axios';
import Cropper from 'react-easy-crop';
import './Avatar.css';
import {
  image64toCanvasRef,
  base64StringtoFile,
  extractImageFileExtensionFromBase64,
} from '../util';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { loadingActionTypes } from '../data/actionTypes';
import { useDispatch } from 'react-redux';

const Avatar = ({ imageSrc, imageSrcExt }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    setImage(imageSrc);
  }, [imageSrc]);

  const imageCanvasRef = useRef();

  const onCropComplete = (crop, pixelCrop) => {
    const canvasRef = imageCanvasRef.current;
    image64toCanvasRef(canvasRef, imageSrc, pixelCrop);
  };

  const handleUpload = (event) => {
    event.preventDefault();

    if (imageSrc) {
      const canvasRef = imageCanvasRef.current;

      const imageData64 = canvasRef.toDataURL('image/' + imageSrcExt);

      const myFilename = 'avatar.' + imageSrcExt;

      // file to be uploaded
      const myNewCroppedFile = base64StringtoFile(imageData64, myFilename);

      const formData = new FormData();
      formData.append('file', myNewCroppedFile);

      dispatch({ type: loadingActionTypes.LOADING });

      axios
        .post('/avatar', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        })
        .then(() => {
          dispatch({ type: loadingActionTypes.NO_LOADING });
          window.location.reload();
        })
        .catch((err) => console.error(err.response));
    }
  };

  const handleClose = (e) => {
    e.preventDefault();
    setImage(null);
  };

  return (
    <>
      {image ? (
        <div className="crop">
          <form>
            <div className="cropContainer">
              <canvas ref={imageCanvasRef} className="d-none"></canvas>
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
                  <button
                    className="btn btn-warning me-2"
                    onClick={handleUpload}
                  >
                    Upload
                  </button>
                  <button
                    className="btn btn-secondary ms-2"
                    onClick={handleClose}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      ) : null}
    </>
  );
};

export default Avatar;
