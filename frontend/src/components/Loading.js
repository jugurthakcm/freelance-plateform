import React from 'react';

const Loading = () => {
  const style = {
    width: '200px',
    height: '200px',
    zIndex: 999999999,
    borderWidth: '20px',
  };
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
        backgroundColor: 'rgba(0,0,0,0.4)',
        zIndex: 99999999,
        overflow: 'none',
      }}
      className="d-flex justify-content-center align-items-center"
    >
      <div
        className="spinner-border text-warning m-auto"
        role="status"
        style={style}
      >
        <span className="visually-hidden"></span>
      </div>
    </div>
  );
};

export default Loading;
