const path = require('path');
const multer = require('multer');

//Upload avatars using multer
exports.uploadAvatarUtil = () => {
  const storage = multer.diskStorage({
    destination: 'uploads/avatars/',
    filename: function (req, file, cb) {
      cb(null, req.userId + path.extname(file.originalname));
    },
  });

  return multer({
    storage: storage,
  }).any();
};
