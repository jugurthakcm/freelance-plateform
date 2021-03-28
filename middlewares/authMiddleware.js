require('dotenv').config();
const jwt = require('jsonwebtoken');

exports.auth = (req, res, next) => {
  try {
    const header = req.headers['authorization'];
    console.log(header);
    const token = header.split(' ')[1];
    // const token = req.cookies.token;

    if (!token || !header) throw 'no token';
    // if (!token) throw 'no token';
    const user = jwt.verify(token, process.env.JWT_KEY);
    req.userId = user._id;
    next();
  } catch (error) {
    res
      .status(401)
      .json({ error: 'You need to be logged in order to perform this action' });
  }
};
