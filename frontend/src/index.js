import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { LanguageProvider } from './ContextAPI/LanguageProvider';
import { initialLanguage, languageReducer } from './ContextAPI/languageReducer';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore, compose } from 'redux';
import rootReducer from './data/reducers/rootReducer';
import thunk from 'redux-thunk';
import 'bootstrap/dist/js/bootstrap.bundle';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <LanguageProvider
        initialLanguage={initialLanguage}
        languageReducer={languageReducer}
      >
        <App />
      </LanguageProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
