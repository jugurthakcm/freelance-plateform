require('dotenv').config();
const jwt = require('jsonwebtoken');

exports.adminMiddleware = (req, res, next) => {
  try {
    const header = req.headers['authorization'];
    const token = header.split(' ')[1];
    // const token = req.cookies.token;

    if (!token || !header) throw 'no token';
    // if (!token) throw 'no token';

    const admin = jwt.verify(token, process.env.JWT_KEY);
    if (!admin.admin) throw 'Access Denied';

    req.adminId = admin._id;
    next();
  } catch (error) {
    res.status(401).send(error);
    next();
  }
};
