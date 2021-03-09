require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const {
  registerAdminValidation,
  loginAdminValidation,
} = require('../validation/adminValidation');
const { Admin } = require('../models/Admin');
const { Gig } = require('../models/Gig');
const { User } = require('../models/User');

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

exports.approveGig = async (req, res) => {
  try {
    if (!req.body.gigId) return res.status(400).send('No gig defined');

    const { gigId } = req.body;
    if (!gigId) throw 'No gig definded';

    const gig = await Gig.findById(gigId);
    if (!gig) throw "This gig doesn't exist";

    gig
      .updateOne({ confirmed: true })
      .then(() => res.status(200).send('Gig confirmed successfully'))
      .catch(() => res.status(500).send('Error during confirming gig'));
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getUsers = (req, res) => {
  User.find({}, { password: 0, __v: 0 })
    .then((data) => res.status(200).send(data))
    .catch(() => res.status(500).send('Error during fetching users'));
};

exports.deleteGig = async (req, res) => {
  try {
    const { gigId } = req.body;
    if (!gigId) throw 'No gig definded';

    const gig = await Gig.findById(gigId);
    if (!gig) throw "This gig doesn't exist";

    gig
      .deleteOne({})
      .then(() => res.status(200).send('Gig deleted successfully'))
      .catch(() => res.status(500).send('Error during deleting gig'));
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) throw 'No user definded';

    const user = await User.findById(userId);
    if (!user) throw "This user doesn't exist";

    user
      .deleteOne({})
      .then(() => res.status(200).send('User deleted successfully'))
      .catch(() => res.status(500).send('Error during deleting user'));
  } catch (error) {
    res.status(400).send(error);
  }
};
