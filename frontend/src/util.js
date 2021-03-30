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

export const sortEducation = (a, b) => {
  const yearA = a.yearStart;
  const yearB = b.yearStart;

  let comparison = 0;

  if (yearA > yearB) {
    comparison = 1;
  } else if (yearA < yearB) {
    comparison = -1;
  }

  return comparison;
};

export function image64toCanvasRef(canvasRef, image64, pixelCrop) {
  const canvas = canvasRef; // document.createElement('canvas');
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;
  const ctx = canvas.getContext('2d');
  const image = new Image();
  image.src = image64;
  image.onload = function () {
    ctx.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height
    );
  };
}

export function base64StringtoFile(base64String, filename) {
  var arr = base64String.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}

export function extractImageFileExtensionFromBase64(base64Data) {
  return base64Data.substring(
    'data:image/'.length,
    base64Data.indexOf(';base64')
  );
}

export const hideModal = (modal) => {
  document.querySelector('.modal-backdrop').remove();
  document.querySelector('body').classList.remove('modal-open');
  document.querySelector('body').style.paddingRight = '';
  modal.hide();
};
