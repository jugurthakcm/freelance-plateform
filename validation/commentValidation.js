const Joi = require('joi');

exports.commentValidation = ({ content }) => {
  const schema = Joi.object({
    content: Joi.string().required().trim().min(1),
  });

  return schema.validate({
    content,
  });
};
