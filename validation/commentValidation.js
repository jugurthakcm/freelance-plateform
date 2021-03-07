const Joi = require('joi');

exports.commentValidation = ({ content }) => {
  const schema = Joi.object({
    content: Joi.string().required().trim().min(1),
    gigId: Joi.string().required().trim().min(1).max(50),
  });

  return schema.validate({
    content,
    gigId,
  });
};
