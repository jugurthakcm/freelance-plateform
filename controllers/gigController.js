const { Category } = require('../models/Category');
const { Gig } = require('../models/Gig');

exports.addGig = async (req, res) => {
  try {
    const { title, categoryId, subCategory, price } = req.body;

    //Getting the category title
    const category = await Category.findById(categoryId);
    if (!category) throw "This category doesn't exist";
    const categoryTitle = category.title;

    //Saving the gig to the db
    Gig.create({
      title,
      category: categoryTitle,
      subCategory,
      price,
      sellerId: req.userId,
    })
      .then(() => res.status(201).send('Gig added successfully'))
      .catch(() => res.status(400).send('Failed to add the gig'));
  } catch (err) {
    res.status(400).send(err);
  }
};
