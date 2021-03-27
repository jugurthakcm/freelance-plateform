import React, { useState, useRef } from 'react';
import axios from '../axios';
import Cropper from 'react-easy-crop';
import './Avatar.css';
import {
  image64toCanvasRef,
  base64StringtoFile,
  extractImageFileExtensionFromBase64,
} from '../util';

const Avatar = () => {
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [imageSrcExt, setImageSrcExt] = useState(null);

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

      const myFilename = 'previewFile.' + imageSrcExt;

      // file to be uploaded
      const myNewCroppedFile = base64StringtoFile(imageData64, myFilename);
      console.log(myNewCroppedFile);
      const formData = new FormData();
      formData.append('file', myNewCroppedFile);

      axios
        .post('/avatar', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        })
        .then((res) => console.log(res.data))
        .catch((err) => console.error(err.response));
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    const myFileItemReader = new FileReader();
    myFileItemReader.addEventListener(
      'load',
      () => {
        const myResult = myFileItemReader.result;
        setImageSrc(myResult);
        setImageSrcExt(extractImageFileExtensionFromBase64(myResult));
      },
      false
    );

    myFileItemReader.readAsDataURL(file);
  };

  return (
    <>
      <form>
        <input type="file" name="avatar" onChange={handleFileSelect} />

        {imageSrc ? (
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
                <button className="btn btn-warning mr-2" onClick={handleUpload}>
                  Upload
                </button>
                <button className="btn btn-secondary ml-2">Close</button>
              </div>
            </div>
          </div>
        ) : null}
      </form>
    </>
  );
};

export default Avatar;
