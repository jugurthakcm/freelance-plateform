import React, { useEffect } from 'react';
import './Language.css';
import french from '../assets/icons/french.png';
import english from '../assets/icons/english.png';
import arabic from '../assets/icons/arabic.png';

const Language = () => {
  useEffect(() => {
    const languageIsSet = localStorage.getItem('language') ? true : false;
    if (!languageIsSet) {
      document.querySelector('.language').classList.remove('d-none');
      document.querySelector('body').classList.add('no-overflow');
    }
  }, []);

  const handleClick = (language) => {
    const languageObject = {
      isSet: true,
      language,
    };
    localStorage.setItem('language', JSON.stringify(languageObject));
    document.querySelector('.language').classList.add('d-none');
    document.querySelector('body').classList.remove('no-overflow');
  };

  return (
    <div className="language d-none">
      <ul className="language__list">
        <h4>Choisis une langue</h4>
        <li className="language__item" onClick={() => handleClick('french')}>
          <img
            src={french}
            alt="french"
            width="22px"
            className="french__icon"
          />
          Français
        </li>
        <li className="language__item" onClick={() => handleClick('english')}>
          <img
            src={english}
            alt="english"
            width="22px"
            className="english__icon"
          />
          English
        </li>
        <li className="language__item" onClick={() => handleClick('arabic')}>
          <img
            src={arabic}
            alt="arabic"
            width="22px"
            className="arabic__icon"
          />
          العربية
        </li>
      </ul>
    </div>
  );
};

export default Language;
