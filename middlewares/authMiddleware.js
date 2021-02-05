require('dotenv').config();
const jwt = require('jsonwebtoken');

exports.auth = (req, res, next) => {
  try {
    const header = req.headers['Authorization'];
    const token = header.split(' ')[1];

    if (!token || !header) throw 'no token';

    const userId = jwt.verify(token, process.env.JWT_KEY);
    req.userId = userId;
    next();
  } catch (error) {
    res.status(400).send(error);
    next();
  }
};
