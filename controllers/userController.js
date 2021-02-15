require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models/User');
const {
  registerValidation,
  loginValidation,
} = require('../validation/userValidation');

/**
 * Register a user
 * /POST
 * @params {firstName, lastName, username, email, password}
 */
exports.register = async (req, res) => {
  try {
    //Validation
    const { error, value } = registerValidation(req.body);
    if (error) throw error.details[0].message;

    const user = value;

    //Verify if user exists
    const emailExists = await User.findOne({ email: user.email });
    if (emailExists) throw 'Email already exists';

    const usernameExists = await User.findOne({ username: user.username });
    if (usernameExists) throw 'Username already exists';

    //Crypt password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);

    //Add the user to the DB
    User.create({
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      email: user.email,
      password: hash,
    })
      .then(() => res.status(200).send('User added successfully'))
      .catch((error) => {
        throw error;
      });
  } catch (error) {
    res.status(400).send(error);
  }
};

/**
 * Login a user
 * /POST
 * @params {email, password}
 */
exports.login = async (req, res) => {
  try {
    //Validation
    const { error, value } = loginValidation(req.body);
    if (error) throw error.details[0].message;

    const user = value;

    //Verify is user exists
    const userDB = await User.findOne({ email: user.email });
    if (!userDB) throw "Email doesn't exist";

    //Decrypt password
    const comparePassword = await bcrypt.compare(
      user.password,
      userDB.password
    );
    if (!comparePassword) throw 'Wrong password';

    //Assign a token to the user
    const token = jwt.sign({ _id: userDB._id }, process.env.JWT_KEY);

    res.cookie('token', token, { httpOnly: true });
    res.status(200).json({ message: 'Logged In', token });
  } catch (error) {
    res.status(400).send(error);
  }
};

/**
 * Logout a user
 * /POST
 * @params {}
 */
exports.logout = (req, res) => {
  res.clearCookie('token');
  res.status(200).send('Successfully logged out');
};

/**
 * Update bio of a user
 * /PUT
 * @params {bio}
 */
exports.updateBio = async (req, res) => {
  User.findByIdAndUpdate(req.userId, { bio: req.body.bio })
    .then(() => res.status(200).send('Bio updated successfully'))
    .catch(() => res.status(400).send('Failed to update the bio'));
};

/**
 * Update skills of a user
 * /PUT
 * @params {skills []}
 */
exports.updateSkills = async (req, res) => {
  User.findByIdAndUpdate(req.userId, { skills: req.body.skills })
    .then(() => res.status(200).send('Skills updated successfully'))
    .catch(() => res.status(400).send('Failed to update the skills'));
};

/**
 * Delete a skill
 * /DELETE
 * @params {skillId}
 */
exports.deleteSkill = async (req, res) => {
  try {
    //Get the skills of the user
    const { skills } = await User.findById(req.userId);

    if (!skills.find((skill) => skill.id === req.body.skillId))
      throw "This skill doesn't exist";

    //Update the skills array
    const skillsUpdated = skills.filter(
      (skill) => skill.id !== req.body.skillId
    );

    //Update the skills in the db
    User.findByIdAndUpdate(req.userId, { skills: skillsUpdated })
      .then(() => res.status(200).send('Skill deleted successfully'))
      .catch(() => res.status(400).send('Failed to delete the skill'));
  } catch (error) {
    res.status(400).send(error);
  }
};
