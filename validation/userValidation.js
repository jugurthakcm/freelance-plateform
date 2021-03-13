const Joi = require('joi');

/**
 * Validate register user
 * @params {firstName, lastName, email, username, password}
 */

exports.registerValidation = ({ firstName, lastName, email, password }) => {
  const schema = Joi.object({
    firstName: Joi.string().required().trim().min(2).max(50),
    lastName: Joi.string().required().trim().min(2).max(50),
    email: Joi.string().email().required().trim().max(50),
    password: Joi.string().required().trim().min(8).max(50),
  });

  return schema.validate({
    firstName,
    lastName,
    email,
    password,
  });
};

/**
 * Validate login user
 * @params {email, password}
 */

exports.loginValidation = ({ email, password }) => {
  const schema = Joi.object({
    email: Joi.string().email().required().trim().max(50),
    password: Joi.string().required().trim().min(8).max(50),
  });

  return schema.validate({
    email,
    password,
  });
};

/**
 * Validate delete skill
 * @params {skillId}
 */
exports.deleteSkillValidation = ({ skillId }) => {
  const schema = Joi.object({
    skillId: Joi.string().trim().required().min(1),
  });

  return schema.validate({ skillId });
};

/**
 * Validate edit name
 * @params {firstName, lastName}
 */
exports.nameValidation = ({ firstName, lastName }) => {
  const schema = Joi.object({
    firstName: Joi.string().required().trim().min(2).max(50),
    lastName: Joi.string().required().trim().min(2).max(50),
  });

  return schema.validate({
    firstName,
    lastName,
  });
};

/**
 * Validate edit username
 * @params {username}
 */
exports.usernameValidation = ({ username }) => {
  const schema = Joi.object({
    username: Joi.string().required().trim().min(3).max(50),
  });

  return schema.validate({
    username,
  });
};

/**
 * Validate edit email
 * @params {email}
 */
exports.emailValidation = ({ email }) => {
  const schema = Joi.object({
    email: Joi.string().email().required().trim().max(50),
  });

  return schema.validate({
    email,
  });
};

/**
 * Validate edit password
 * @params {password}
 */
exports.passwordValidation = ({ newPassword, confirmedPassword }) => {
  const schema = Joi.object({
    newPassword: Joi.string().required().trim().min(8).max(50),
    confirmedPassword: Joi.string().required().trim().min(8).max(50),
  });

  return schema.validate({
    newPassword,
    confirmedPassword,
  });
};

/**
 * Validate update skills
 * @params {skillId, skill}
 */
exports.skillsValidation = ({ skillId, skill }) => {
  const schema = Joi.object({
    skillId: Joi.string().required().trim().min(1),
    skill: Joi.string().required().min(2).max(50),
  });

  return schema.validate({
    skillId,
    skill,
  });
};
