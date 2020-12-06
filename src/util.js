import french from './assets/icons/french.png';
import english from './assets/icons/english.png';
import arabic from './assets/icons/arabic.png';

export const selectLanguageIcon = (language) => {
  switch (language) {
    case 'french':
      return french;

    case 'english':
      return english;

    case 'arabic':
      return arabic;

    default:
      break;
  }
};
