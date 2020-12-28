import { LOCALES } from '../i18n/locales';

const languageStorage = localStorage.getItem('language');

export const initialLanguage = languageStorage
  ? JSON.parse(languageStorage).language
  : LOCALES.ENGLISH;

export const languagesActionsTypes = {
  FRENCH: LOCALES.FRENCH,
  ENGLISH: LOCALES.ENGLISH,
};

export const languageReducer = (state = initialLanguage, action) => {
  switch (action.type) {
    case languagesActionsTypes.FRENCH:
      return action.language;

    case languagesActionsTypes.ENGLISH:
      return action.language;

    default:
      return state;
  }
};
