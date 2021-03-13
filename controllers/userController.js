require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { sendMail } = require('../mail/nodemailer');
const { User } = require('../models/User');
const {
  registerValidation,
  loginValidation,
  deleteSkillValidation,
  nameValidation,
  usernameValidation,
  emailValidation,
  passwordValidation,
  skillsValidation,
} = require('../validation/userValidation');
const Joi = require('joi');
const phoneJoi = Joi.extend(require('joi-phone-number'));

/**
 * Register a user
 * /POST
 * @params {firstName, lastName, username, email, password}
 */
exports.register = async (req, res) => {
  try {
    const phone = phoneJoi
      .string()
      .phoneNumber({
        defaultCountry: 'DZ',
        format: 'international',
        strict: true,
      })
      .validate(req.body.phone);

    if (phone.error) throw 'Invalid phone number';
    //Validation
    const { error, value } = registerValidation(req.body);
    if (error) throw error.details[0].message;

    const user = value;

    const emailExists = await User.findOne({ email: user.email });
    if (emailExists) throw 'Email already exists';

    const usernameExists = await User.findOne({ username: user.username });
    if (usernameExists) throw 'Username already exists';

    //Crypt password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);

    const newUser = new User({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: hash,
      phone: phone.value,
    });

    const token = jwt.sign({ _id: newUser._id }, process.env.JWT_KEY, {
      expiresIn: '1h',
    });

    const paramsEmail = { subject: 'Confirm your email', token };
    const emailSent = await sendMail(paramsEmail, user.email);
    if (!emailSent.messageId) throw 'Failed during sending email';

    //Add the user to the DB
    newUser
      .save()
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
    res.status(200).send(token);
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
  try {
    const { error, value } = skillsValidation(req.body);
    if (error) throw error.details[0].message;

    const { skillId, skill } = value;
    const user = await User.findById(req.userId);
    const skills = user.skills;
    skills.push({ id: skillId, skill });

    user
      .updateOne({ skills })
      .then(() => res.status(200).send('Skills updated successfully'))
      .catch(() => res.status(400).send('Failed to update the skills'));

    // User.findByIdAndUpdate(req.userId, { skills })
  } catch (error) {
    res.status(400).send(error);
  }
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

    //Validate the skill request
    const { error, value } = deleteSkillValidation(req.body);
    if (error) throw 'Skill is not defined';

    const { skillId } = value;

    if (!skills.find((skill) => skill.id === skillId))
      throw "This skill doesn't exist";

    //Update the skills array
    const skillsUpdated = skills.filter((skill) => skill.id !== skillId);

    //Update the skills in the db
    User.findByIdAndUpdate(req.userId, { skills: skillsUpdated })
      .then(() => res.status(200).send('Skill deleted successfully'))
      .catch(() => res.status(400).send('Failed to delete the skill'));
  } catch (error) {
    res.status(400).send(error);
  }
};

/**
 * User edits his name
 * /PUT
 * @params {firstName, lastName}
 */

exports.editName = (req, res) => {
  //Validate the name
  const { error, value } = nameValidation(req.body);
  if (error) res.status(400).send(error.details[0].message);

  const { firstName, lastName } = value;

  User.findOneAndUpdate({ _id: req.userId }, { firstName, lastName })
    .then(() => res.status(200).send('Name changed successfully'))
    .catch((err) => res.status(400).send(err));
};

/**
 * User edits his username
 * /PUT
 * @params {username}
 */

exports.editUsername = (req, res) => {
  //Validate the username
  const { error, value } = usernameValidation(req.body);
  if (error) res.status(400).send(error.details[0].message);

  const { username } = value;

  User.findOneAndUpdate({ _id: req.userId }, { username })
    .then(() => res.status(200).send('Username changed successfully'))
    .catch((err) => res.status(400).send(err));
};

/**
 * User edits his email
 * /PUT
 * @params {email}
 */

exports.editEmail = (req, res) => {
  //Validate the email
  const { error, value } = emailValidation(req.body);
  if (error) res.status(400).send(error.details[0].message);

  const { email } = value;
  User.findOneAndUpdate({ _id: req.userId }, { email })
    .then(() => res.status(200).send('Email changed successfully'))
    .catch((err) => res.status(400).send(err));
};

/**
 * User edits his password
 * /PUT
 * @params {oldPassword, newPassword, confirmedPassword}
 */

exports.editPassword = async (req, res) => {
  try {
    //Validate the new password
    const { error, value } = passwordValidation(req.body);
    if (error) throw error;

    const { newPassword, confirmedPassword } = value;

    //Getting the old password from body
    const { oldPassword } = req.body;

    //Check newPassword and confirmed one are equals
    if (newPassword !== confirmedPassword) throw 'Passwords must be equals';

    //Get the user from the DB
    const user = await User.findOne({ _id: req.userId });

    //Compare oldPassword to password in DB
    const comparePassword = await bcrypt.compare(oldPassword, user.password);
    if (!comparePassword) throw 'Wrong password';

    //Hash newPassword
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newPassword, salt);

    //Update the new password
    user
      .updateOne({ password: hash })
      .then(() => res.status(200).send('Password changed successfully'))
      .catch((err) => res.status(400).send(err));
  } catch (error) {
    res.status(400).send(error);
  }
};

/**
 * User deletes his account
 * /DELETE
 * @params {userId}
 */

exports.deleteAccount = (req, res) => {
  User.findOneAndDelete({ _id: req.userId })
    .then(() => res.status(200).send('Account deleted successfully'))
    .catch(() => res.status(400).send('Error during deleting account'));
};
