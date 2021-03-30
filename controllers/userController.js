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
  educationValidation,
} = require('../validation/userValidation');
const Joi = require('joi');
const phoneJoi = Joi.extend(require('joi-phone-number'));
const path = require('path');

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
        format: 'international',
      })
      .validate(req.body.phone);

    if (phone.error) throw { field: 'phone', error: 'Invalid phone number' };

    const { error, value } = registerValidation(req.body);
    if (error)
      throw {
        field: error.details[0].path[0],
        message: error.details[0].message,
      };

    const user = value;

    const emailExists = await User.findOne({ email: user.email });
    if (emailExists) throw { field: 'email', error: 'Email already exists' };

    const usernameExists = await User.findOne({ username: user.username });
    if (usernameExists)
      throw { field: 'username', error: 'Username already exists' };

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);

    const newUser = new User({
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      email: user.email,
      password: hash,
      phone: phone.value,
    });

    const token = jwt.sign({ _id: newUser._id }, process.env.JWT_KEY, {
      expiresIn: '1h',
    });

    const paramsEmail = { subject: 'Confirm your email', token };
    const emailSent = await sendMail(paramsEmail, user.email);

    if (!emailSent.messageId)
      return res.status(500).json({ error: 'Failed during sending email' });

    const accessToken = jwt.sign({ _id: newUser._id }, process.env.JWT_KEY);

    newUser
      .save()
      .then(() =>
        res.status(200).json({
          message: 'You are registred succesfully',
          token: accessToken,
        })
      )
      .catch((error) => {
        throw error;
      });
  } catch (error) {
    res.status(400).json({ error });
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
    if (error)
      throw {
        fieldLogin: error.details[0].path[0],
        message: error.details[0].message,
      };

    const user = value;

    //Verify is user exists
    const userDB = await User.findOne({ email: user.email });
    if (!userDB) throw { fieldLogin: 'email', error: "Email doesn't exist" };

    //Decrypt password
    const comparePassword = await bcrypt.compare(
      user.password,
      userDB.password
    );
    if (!comparePassword)
      throw { fieldLogin: 'password', error: 'Wrong password' };

    //Assign a token to the user
    const token = jwt.sign({ _id: userDB._id }, process.env.JWT_KEY);

    // res.cookie('token', token, { httpOnly: true });
    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json({ error });
  }
};

/**
 * Logout a user
 * /POST
 * @params {}
 */
exports.logout = (req, res) => {
  // res.clearCookie('token');
  res.status(200).send('Successfully logged out');
};

/**
 * Load a user
 * /GET
 * @params {}
 */
exports.loadUser = async (req, res) => {
  try {
    const user = await User.find({ _id: req.userId }, { password: 0 });
    if (!user.length) throw 'No user';

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error });
  }
};

/**
 * Update bio of a user
 * /PUT
 * @params {bio}
 */
exports.updateBio = async (req, res) => {
  User.findByIdAndUpdate(req.userId, { bio: req.body.bio }, { new: true })
    .then((user) => res.status(200).json({ user }))
    .catch((error) => res.status(500).json({ error }));
};

/**
 * Update skills of a user
 * /PUT
 * @params {skills []}
 */
exports.updateSkills = async (req, res) => {
  try {
    const { skills } = req.body;

    User.findByIdAndUpdate(req.userId, { skills }, { new: true })
      .then((user) => res.status(200).json({ user }))
      .catch((error) => res.status(500).json({ error }));
  } catch (error) {
    res.status(400).json({ error });
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

    const { id } = value;

    if (!skills.find((skill) => skill.id === id))
      throw "This skill doesn't exist";

    //Update the skills array
    const skillsUpdated = skills.filter((skill) => skill.id !== id);

    //Update the skills in the db
    User.findByIdAndUpdate(req.userId, { skills: skillsUpdated })
      .then(() =>
        res.status(200).json({ message: 'Skill deleted successfully' })
      )
      .catch(() =>
        res.status(500).json({ error: 'Failed to delete the skill' })
      );
  } catch (error) {
    res.status(400).json({ error });
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
    const { error, value } = passwordValidation(req.body);
    if (error) throw error;

    const { newPassword, confirmedPassword } = value;

    const { oldPassword } = req.body;

    if (newPassword !== confirmedPassword) throw 'Passwords must be equals';

    const user = await User.findOne({ _id: req.userId });

    const comparePassword = await bcrypt.compare(oldPassword, user.password);
    if (!comparePassword) throw 'Wrong password';

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newPassword, salt);

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

/**
 * User update his education
 * /PUT
 * @params {id, school, degree, yearStart, yearEnd, areaOfStudy}
 */

exports.updateEducation = async (req, res) => {
  try {
    const { error, value } = educationValidation(req.body);
    if (error)
      throw {
        field: error.details[0].path[0],
        message: error.details[0].message,
      };

    const { id, school, degree, yearStart, yearEnd, areaOfStudy } = value;

    if (yearStart > yearEnd)
      throw {
        field: 'year',
        error: "Starting year can't be less than end year",
      };

    const user = await User.findOne({ _id: req.userId });

    const newEducation = user.education.filter((e) => e.id !== id);

    newEducation.push({ id, school, degree, yearStart, yearEnd, areaOfStudy });

    user
      .updateOne({ education: newEducation })
      .then(() =>
        res.status(200).json({ message: 'Education updated successfully' })
      )
      .catch((err) => res.status(500).json({ error: err }));
  } catch (error) {
    res.status(400).json({ error });
  }
};

/**
 * User deletes his education
 * /POST
 * @params {id}
 */

exports.deleteEducation = async (req, res) => {
  try {
    const { id } = req.body;
    const user = await User.findById(req.userId);

    const newEducation = user.education.filter((e) => e.id !== id);

    user
      .updateOne({ education: newEducation })
      .then(() =>
        res.status(200).json({ message: 'Education deleted successfully' })
      )
      .catch((err) => res.status(500).json({ error: err }));
  } catch (error) {
    res.status(400).json({ error });
  }
};

/**
 * User updates his languages
 * /PUT
 * @params {id, language, level}
 */

exports.addLanguage = async (req, res) => {
  try {
    const { id, language, level } = req.body;

    const user = await User.findOne({ _id: req.userId });

    const newLanguage = user.languages.filter((e) => e.id !== id);

    newLanguage.push({ id, language, level });

    user
      .updateOne({ languages: newLanguage })
      .then(() =>
        res.status(200).json({ message: 'Languages added successfully' })
      )
      .catch((err) => res.status(500).json({ error: err }));
  } catch (error) {
    res.status(400).json({ error });
  }
};

/**
 * User deletes his language
 * /POST
 * @params {arr}
 */

exports.updateLanguage = async (req, res) => {
  try {
    const newLanguage = req.body.arr;
    const user = await User.findById(req.userId);

    user
      .updateOne({ languages: newLanguage })
      .then(() =>
        res.status(200).json({ message: 'Language updated successfully' })
      )
      .catch((err) => res.status(500).json({ error: err }));
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.updateTitle = (req, res) => {
  User.findByIdAndUpdate(req.userId, { title: req.body.title })
    .then(() => res.status(200).json({ message: 'Title updated successfully' }))
    .catch((err) => res.status(500).json({ error: err }));
};

exports.editAvatar = (req, res) => {
  const file = req.files[0];
  const fileExt = path.extname(file.originalname);

  User.findByIdAndUpdate(req.userId, { imageURI: req.userId + fileExt })
    .then(() => res.status(200).json({ message: 'Uploading user avatar done' }))
    .catch((error) => res.status(500).json({ error }));
};
