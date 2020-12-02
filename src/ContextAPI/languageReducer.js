export const initialLanguage = 'english';

export const languageReducer = (state = initialLanguage, action) => {
  switch (action.type) {
    case 'french':
      return action.language;
    case 'english':
      return action.language;
    default:
      return state;
  }
};
