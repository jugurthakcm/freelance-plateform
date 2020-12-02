export const initialLanguage = 'english';

export const languagesActionsTypes = {
  FRENCH: 'french',
  ENGLISH: 'english',
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
