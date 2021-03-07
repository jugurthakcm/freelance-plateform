const Joi = require('joi');

exports.gigValidation = ({ title, categoryId, subCategory, price }) => {
  const schema = Joi.object({
    title: Joi.string().required().trim().min(1).max(50),
    categoryId: Joi.string().required().trim().min(1).max(50),
    subCategory: Joi.string().required().trim().min(1).max(50),
    price: Joi.number().required().trim().min(1),
  });

  return schema.validate({
    title,
    categoryId,
    subCategory,
    price,
  });
};

exports.ratingValidation = ({ rating }) => {
  const schema = Joi.object({
    rating: Joi.number().required().trim().min(1).max(5),
  });

  return schema.validate({
    rating,
  });
};
