const { Category } = require('../models/Category');
const { Gig } = require('../models/Gig');
const { User } = require('../models/User');
const { uploadGigsImagesUtil } = require('../util');
const {
  gigValidation,
  ratingValidation,
} = require('../validation/gigValidation');
const path = require('path');

/**
 * User adds his gig
 * /POST
 * @params {title, categoryId, price}
 */
exports.addGig = async (req, res) => {
  try {
    const { error, value } = gigValidation(req.body);
    if (error) throw error.details[0].message;

    const { title, categoryId, price, deliveryTime, description } = value;

    const categoryDB = await Category.findById(categoryId);

    if (!categoryDB) throw "This category doesn't exist";
    const category = categoryDB.title;

    const userDB = await User.findById(req.userId);

    if (!userDB) throw "This user doesn't exist";
    const user = userDB.firstName + ' ' + userDB.lastName;

    Gig.create({
      title,
      category: {
        title: category,
        id: categoryId,
      },
      price,
      seller: { id: req.userId, name: user },
      deliveryTime,
      description,
    })
      .then((data) => res.status(200).json({ data }))
      .catch((err) => res.status(500).json({ error: err }));
  } catch (error) {
    res.status(400).json({ error });
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

    if (req.userId !== gig.sellerId)
      throw "You don't have the permission to delete this gig";

    //Delete the gig
    const deletedGig = await Gig.findByIdAndRemove(id);

    Gig.find({ 'seller.id': req.userId })
      .then((data) => res.status(200).json({ data }))
      .catch(() =>
        res.status(500).json({ error: 'Error during fetching gigs' })
      );
    // res.status(200).send({ message: 'Gig deleted successfully' });
  } catch (error) {
    res.status(500).send({ error });
  }
};

/**
 * A user gets his own gigs
 * /GET
 * @params {userId}
 */
exports.getMyGigs = (req, res) => {
  Gig.find({ 'seller.id': req.userId })
    .sort({ createdAt: -1 })
    .then((data) => res.status(200).json({ data }))
    .catch(() => res.status(500).json({ error: 'Error during fetching gigs' }));
};

/**
 * A user gets his pending gigs
 * /GET
 * @params {userId}
 */
exports.getMyPendingGigs = (req, res) => {
  Gig.find({ sellerId: req.userId, confirmed: false, pending: true })
    .then((data) => res.status(200).json({ data }))
    .catch(() => res.status(500).json({ error: 'Error during fetching gigs' }));
};

/**
 * A user gets his gig
 * /GET
 * @params {userId, gigId}
 */

exports.getGig = (req, res) => {
  Gig.find({ _id: req.params.id })
    .then((data) => res.status(200).json({ data }))
    .catch(() => res.status(500).json({ error: 'Error during fetching gig' }));
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

    const {
      title,
      categoryId,
      subCategory,
      price,
      description,
      deliveryTime,
    } = value;

    const category = await Category.findById(categoryId);

    if (!category) throw "This category doesn't exist";
    const categoryTitle = category.title;

    const gig = await Gig.findOne({
      _id: req.params.id,
      'seller.id': req.userId,
    });

    if (!gig) throw "This gig doesn't exist";

    Gig.findOneAndUpdate(
      { _id: req.params.id, seller: { id: req.userId } },
      {
        title,
        price,
        category: {
          id: categoryId,
          title: categoryTitle,
        },
        subCategory,
        confirmed: false,
        description,
        deliveryTime,
      }
    )
      .then((gig) => res.status(200).json({ gig }))
      .catch(() => res.status(500).json({ error: 'Error editing the gig' }));
  } catch (error) {
    res.status(400).json({ error });
  }
};

/**
 * A user explore all gigs except his
 * /GET
 * @params {userId}
 */
exports.exploreGigs = (req, res) => {
  Gig.find({
    'seller.id': { $ne: req.userId },
    confirmed: true,
    pending: false,
  })
    .sort({ createdAt: -1 })
    .then((gigs) => res.status(200).json({ gigs }))
    .catch((error) => res.status(500).json({ error }));
};

/**
 * A user explore gigs filtred by categories
 * /GET
 * @params {userId, categoryURL}
 */
exports.filterGigsPerCategory = (req, res) => {
  const categoryURL = req.params.category.split('_').join(' ');

  Gig.find({
    category: categoryURL,
    sellerId: { $ne: req.userId },
    confirmed: true,
  })
    .then((data) => res.status(200).send(data))
    .catch(() => res.status(500).send('Error fetching gigs'));
};

/**
 * A user rate a gig
 * /POST
 * @params {gigId, rating}
 */
exports.rateGig = async (req, res) => {
  try {
    const { error, value } = ratingValidation(req.body);

    if (error) throw error.details[0].message;

    const { rating } = value;

    const gig = await Gig.findOne({ _id: req.params.gigId, confirmed: true });
    if (!gig) throw "this gig doesn't exist";

    if (gig.sellerId === req.userId) throw "you can't rate your own gig";

    const newRate = (gig.rating + rating) / 2;

    gig
      .update({ rating: newRate })
      .then(() => res.status(200).send('Gig rated successfully'))
      .catch(() => res.status(500).send('Error during rating gig'));
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.editGigImage = (req, res) => {
  const file = req.files[0];
  console.log(file);
  const fileExt = path.extname(file.originalname);

  Gig.findByIdAndUpdate(req.params.id, { imageURI: req.params.id + fileExt })
    .then(() => res.status(200).json({ message: 'Uploading gig image done' }))
    .catch((error) => res.status(500).json({ error }));
};
