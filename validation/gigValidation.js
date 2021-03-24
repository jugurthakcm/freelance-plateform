const Joi = require('joi');

exports.gigValidation = ({
  title,
  description,
  categoryId,
  subCategory,
  price,
  deliveryTime,
}) => {
  const schema = Joi.object({
    title: Joi.string().required().trim().min(1).max(50),
    description: Joi.string().required().trim().min(1).max(1500),
    categoryId: Joi.string().required().trim().min(1).max(50),
    subCategory: Joi.string().required().trim().min(1).max(50),
    price: Joi.number().required().min(1),
    deliveryTime: Joi.string().min(1),
  });

  return schema.validate({
    title,
    categoryId,
    subCategory,
    price,
    description,
    deliveryTime,
  });
};

exports.ratingValidation = ({ rating }) => {
  const schema = Joi.object({
    rating: Joi.number().required().min(1).max(5),
  });

  return schema.validate({
    rating,
  });
};
