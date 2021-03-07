const { Gig } = require('../models/Gig');
const { Comment } = require('../models/Comment');
const { commentValidation } = require('../validation/commentValidation');

exports.addComment = async (req, res) => {
  try {
    const { error, value } = commentValidation(req.body);
    if (error) throw error.details[0].message;

    const { content, gigId } = value;

    const gig = await Gig.findById(gigId);
    if (!gig) throw 'No gig defined';

    const receiverId = gig.sellerId;

    Comment.create({
      content,
      senderId: req.userId,
      receiverId,
      gigId,
    })
      .then(() => res.status(200).send('Comment created successfully'))
      .catch(() => res.status(500).send('Error during creating comment'));
  } catch (error) {
    res.status(400).send(error);
  }
};
