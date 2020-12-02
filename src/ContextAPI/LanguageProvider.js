import React, { createContext, useContext, useReducer } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({
  children,
  languageReducer,
  initialLanguage,
}) => (
  <LanguageContext.Provider
    value={useReducer(languageReducer, initialLanguage)}
  >
    {children}
  </LanguageContext.Provider>
);

export const useLanguageContext = () => useContext(LanguageContext);
