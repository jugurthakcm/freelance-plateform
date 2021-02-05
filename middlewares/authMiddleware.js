require('dotenv').config();
const jwt = require('jsonwebtoken');

exports.auth = (req, res, next) => {
  try {
    const header = req.headers['authorization'];
    const token = header.split(' ')[1];

    if (!token || !header) throw 'no token';
    const userId = jwt.verify(token, process.env.JWT_KEY);
    req.userId = userId;
    next();
  } catch (error) {
    res
      .status(401)
      .send('You need to be logged in order to perform this action');
    next();
  }
};
