const { Category } = require('../models/Category');
const { Gig } = require('../models/Gig');

/**
 * User adds his gig
 * /POST
 * @params {title, categoryId, subCategory, price}
 */
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

/**
 * A user deletes his gig
 * /DELETE
 * @params {gigId}
 */
exports.deleteGig = async (req, res) => {
  try {
    const gig = await Gig.findById(req.body.id);

    //Verify if the gig exists
    if (!gig) throw "This gig doesn't exist";

    //Check if the user owns the gig
    if (req.userId._id !== gig.sellerId)
      throw "You don't have the permission to delete this gig";

    //Delete the gig
    const deletedGig = await Gig.findByIdAndRemove(req.body.id);
    res.status(200).send('Gig deleted successfully');
  } catch (error) {
    res.status(400).send(error);
  }
};

/**
 * A user gets his own gigs
 * /GET
 * @params {userId}
 */
exports.getMyGigs = (req, res) => {
  Gig.find({ sellerId: req.userId })
    .then((data) => res.status(200).send(data))
    .catch(() => res.status(400).send('Error during fetching gigs'));
};

/**
 * A user gets his gig
 * /GET
 * @params {userId, gigId}
 */

exports.getMyGig = (req, res) => {
  Gig.find({ sellerId: req.userId, _id: req.params.id })
    .then((data) => res.status(200).send(data))
    .catch(() => res.status(400).send('Error during fetching gig'));
};

/**
 * A user edit his gig
 * /PUT
 * @params {title, price, category, subCategory}
 */

exports.editMyGig = async (req, res) => {
  try {
    const { title, categoryId, subCategory, price } = req.body;

    //Getting the category title
    const category = await Category.findById(categoryId);

    if (!category) throw "This category doesn't exist";
    const categoryTitle = category.title;

    //Get the gig and edit it
    const gig = await Gig.findOne({ _id: req.params.id, sellerId: req.userId });

    //Check if the gig exists
    if (!gig) throw "This gig doesn't exist";

    //Update the gig
    gig
      .updateOne({
        title,
        price,
        category: categoryTitle,
        subCategory,
      })
      .then(() => res.status(200).send('Gig Edited successfully'))
      .catch(() => res.status(400).send('Error editing the gig'));
  } catch (error) {
    res.status(400).send(error);
  }
};
