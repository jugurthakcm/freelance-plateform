require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const {
  registerAdminValidation,
  loginAdminValidation,
} = require('../validation/adminValidation');
const { Admin } = require('../models/Admin');
const { Gig } = require('../models/Gig');

/**
 * Register an admin
 * /POST
 * @params {firstName, lastName, email, password}
 */

exports.registerAdmin = async (req, res) => {
  try {
    const { error, value } = registerAdminValidation(req.body);
    if (error) throw error.details[0].message;

    const admin = value;

    const domainEmail = admin.email.split('@')[1];
    if (domainEmail !== 'handelp.admin.com')
      throw "You can't register it as an admin";

    const emailExists = await Admin.findOne({ email: admin.email });
    if (emailExists) throw 'Email already exists';

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(admin.password, salt);

    Admin.create({
      firstName: admin.firstName,
      lastName: admin.lastName,
      email: admin.email,
      password: hash,
    })
      .then(() => res.status(200).send('Admin added successfully'))
      .catch((error) => {
        throw error;
      });
  } catch (error) {
    res.status(400).send(error);
  }
};

/**
 * Login an admin
 * /POST
 * @params {email, password}
 */
exports.loginAdmin = async (req, res) => {
  try {
    const { error, value } = loginAdminValidation(req.body);
    if (error) throw error.details[0].message;

    const admin = value;

    const domainEmail = admin.email.split('@')[1];
    if (domainEmail !== 'handelp.admin.com') throw "You aren't an admin";

    const adminDB = await Admin.findOne({ email: admin.email });
    if (!adminDB) throw "Email doesn't exist";

    const comparePassword = await bcrypt.compare(
      admin.password,
      adminDB.password
    );
    if (!comparePassword) throw 'Wrong password';

    const token = jwt.sign(
      { _id: adminDB._id, admin: true },
      process.env.JWT_KEY
    );

    res.cookie('token', token, { httpOnly: true });
    res.status(200).send(token);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getGigs = (req, res) => {
  Gig.find({})
    .then((data) => res.status(200).send(data))
    .catch(() => res.status(500).send('Error during fetching gigs'));
};

exports.getPendingGigs = (req, res) => {
  Gig.find({ confirmed: false })
    .then((data) => res.status(200).send(data))
    .catch(() => res.status(500).send('Error during fetching gigs'));
};

exports.approveGig = (req, res) => {
  if (!req.body.gigId) return res.status(400).send('No gig defined');

  Gig.findOneAndUpdate({ _id: req.body.gigId }, { confirmed: true })
    .then(() => res.status(200).send('Gig confirmed successfully'))
    .catch(() => res.status(500).send('Error during confirming gig'));
};
