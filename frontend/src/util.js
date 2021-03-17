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

export const generateYears = (grad) => {
  const d = new Date();
  const y = d.getFullYear();
  let arr = [];
  if (grad) {
    for (let i = 1962; i <= y + 10; i++) {
      arr.unshift(i);
    }
  } else {
    for (let i = 1962; i <= y; i++) {
      arr.unshift(i);
    }
  }
  return arr;
};
