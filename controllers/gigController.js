const { Category } = require('../models/Category');
const { Gig } = require('../models/Gig');
const {
  gigValidation,
  ratingValidation,
} = require('../validation/gigValidation');

/**
 * User adds his gig
 * /POST
 * @params {title, categoryId, subCategory, price}
 */
exports.addGig = async (req, res) => {
  try {
    const { error, value } = gigValidation(req.body);
    if (error) throw error.details[0].message;

    const { title, categoryId, subCategory, price } = value;

    const category = await Category.findById(categoryId);

    if (!category) throw "This category doesn't exist";
    const categoryTitle = category.title;

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
    const { id } = req.body;
    if (!id) throw 'No gig definded';

    const gig = await Gig.findById(id);

    if (!gig) throw "This gig doesn't exist";

    if (req.userId._id !== gig.sellerId)
      throw "You don't have the permission to delete this gig";

    //Delete the gig
    const deletedGig = await Gig.findByIdAndRemove(id);
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
    const { error, value } = gigValidation(req.body);
    if (error) throw error.details[0].message;

    const { title, categoryId, subCategory, price } = value;

    const category = await Category.findById(categoryId);

    if (!category) throw "This category doesn't exist";
    const categoryTitle = category.title;

    const gig = await Gig.findOne({ _id: req.params.id, sellerId: req.userId });

    if (!gig) throw "This gig doesn't exist";

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

exports.exploreGigs = (req, res) => {
  Gig.find({ sellerId: { $ne: req.userId._id } })
    .then((data) => res.status(200).send(data))
    .catch(() => res.status(500).send('Error fetching gigs'));
};

exports.filterGigsPerCategory = (req, res) => {
  const categoryURL = req.params.category.split('_').join(' ').toUpperCase();

  Gig.find({ category: categoryURL })
    .then((data) => res.status(200).send(data))
    .catch(() => res.status(500).send('Error fetching gigs'));
};

exports.rateGig = async (req, res) => {
  try {
    const { error, value } = ratingValidation(req.body);
    if (error) throw error.details[0].message;

    const { rating } = value;

    const gig = await Gig.findOne({ _id: req.params.gigId });

    gig
      .update({ rating: (gig.rating + rating) / 2 })
      .then(() => res.status(200).send('Gig rated successfully'))
      .catch(() => res.status(500).send('Error during rating gig'));
  } catch (error) {
    res.status(400).send(error);
  }
};
