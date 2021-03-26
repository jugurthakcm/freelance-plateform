import React, { useState } from 'react';
import axios from '../axios';

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
        },
      })
      .then((res) => console.log(res.data))
      .catch((err) => console.error(err.response));
  };

  return (
    <form encType="multipart/form-data" onSubmit={handleSubmit}>
      <input
        type="file"
        name="avatar"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <input type="submit" value="submit" />
    </form>
  );
};

export default Avatar;
