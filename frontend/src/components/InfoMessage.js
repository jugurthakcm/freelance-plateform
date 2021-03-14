import React from 'react';
import './InfoMessage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { resetUserState } from '../data/actions/userActions';

const InfoMessage = ({ message, error }) => {
  const infoBox = document.querySelector('.info');

  if (message || error) infoBox.style.bottom = '20px';

  if (message) {
    infoBox.classList.add('success');
    infoBox.classList.remove('error');
  }
  if (error) {
    infoBox.classList.add('error');
    infoBox.classList.remove('success');
  }

  const dispatch = useDispatch();

  const handleClick = () => {
    document.querySelector('.info').style.bottom = '-100px';
    dispatch(resetUserState());
  };
  return (
    <div className="info">
      <p>{message || error}</p>
      <button onClick={handleClick}>
        <FontAwesomeIcon icon={faTimes} />
      </button>
    </div>
  );
};

export default InfoMessage;
