const { Category } = require('../models/Category');

exports.getCategories = (req, res) => {
  Category.find({}).then((data) => res.send(data));
};
