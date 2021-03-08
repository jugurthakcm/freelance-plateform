const { Gig } = require('../models/Gig');
const { Comment } = require('../models/Comment');
const { addCommentValidation } = require('../validation/commentValidation');
const { editCommentValidation } = require('../validation/commentValidation');

/**
 * A user adds a comment to a gig
 * /POST
 * @params {content, gigId}
 */

exports.addComment = async (req, res) => {
  try {
    const { error, value } = addCommentValidation(req.body);
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

/**
 * A user edits his comment on a gig
 * /POST
 * @params {content, commentId}
 */
exports.editComment = async (req, res) => {
  try {
    const { error, value } = editCommentValidation(req.body);
    if (error) throw error.details[0].message;

    const { content, commentId } = value;

    const comment = await Comment.findById(commentId);
    if (!comment) throw 'No comment defined';

    Comment.updateOne({
      content,
    })
      .then(() => res.status(200).send('Comment updated successfully'))
      .catch(() => res.status(500).send('Error during updating comment'));
  } catch (error) {
    res.status(400).send(error);
  }
};
