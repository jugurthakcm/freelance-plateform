import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery'; //eslint-disable-line
import Popper from 'popper.js'; //eslint-disable-line
import 'bootstrap/dist/js/bootstrap.bundle.min';

import { LanguageProvider } from './ContextAPI/LanguageProvider';
import { initialLanguage, languageReducer } from './ContextAPI/languageReducer';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <LanguageProvider
        initialLanguage={initialLanguage}
        languageReducer={languageReducer}
      >
        <App />
      </LanguageProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
