const Joi = require('joi');

exports.addCommentValidation = ({ content, gigId }) => {
  const schema = Joi.object({
    content: Joi.string().required().trim().min(1),
    gigId: Joi.string().required().trim().min(1).max(50),
  });

  return schema.validate({
    content,
    gigId,
  });
};

exports.editCommentValidation = ({ content, commentId }) => {
  const schema = Joi.object({
    content: Joi.string().required().trim().min(1),
    commentIdId: Joi.string().required().trim().min(1).max(50),
  });

  return schema.validate({
    content,
    commentId,
  });
};
