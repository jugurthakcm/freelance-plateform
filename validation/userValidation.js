const Joi = require('joi');

exports.registerValidation = ({
  firstName,
  lastName,
  email,
  username,
  password,
}) => {
  const schema = Joi.object({
    firstName: Joi.string().required().trim().min(2).max(50),
    lastName: Joi.string().required().trim().min(2).max(50),
    username: Joi.string().required().trim().min(3).max(50),
    email: Joi.string().email().required().trim().max(50),
    password: Joi.string().required().trim().min(8).max(50),
  });

  return schema.validate({
    firstName,
    lastName,
    email,
    username,
    password,
  });
};

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
