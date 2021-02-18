const { Category } = require('../models/Category');

/*
 * Get categories
 * /GET
 * @params {}
 */
exports.getCategories = (req, res) => {
  Category.find({})
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(400).send(err));
};
