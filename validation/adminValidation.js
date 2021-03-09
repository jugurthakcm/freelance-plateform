const Joi = require('joi');

exports.registerAdminValidation = ({
  firstName,
  lastName,
  email,
  password,
}) => {
  const schema = Joi.object({
    firstName: Joi.string().required().min(1).max(50),
    lastName: Joi.string().required().min(1).max(50),
    email: Joi.string().email().required().trim().min(1).max(50),
    password: Joi.string().trim().required().min(8).max(50),
  });

  return schema.validate({
    firstName,
    lastName,
    email,
    password,
  });
};

exports.loginAdminValidation = ({ email, password }) => {
  const schema = Joi.object({
    email: Joi.string().email().required().trim().min(1).max(50),
    password: Joi.string().trim().required().min(8).max(50),
  });

  return schema.validate({
    email,
    password,
  });
};
