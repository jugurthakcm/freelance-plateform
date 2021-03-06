const Joi = require('joi');

exports.requestValidation = ({ title, description }) => {
  const schema = Joi.object({
    title: Joi.string().required().trim().min(1).max(50),
    description: Joi.string().required().trim().min(1),
    userId: Joi.string().required().trim().min(1).max(50),
  });

  return schema.validate({
    title,
    description,
    userId,
  });
};
