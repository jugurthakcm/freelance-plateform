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
 * /PUT
 * @params {content, commentId}
 */
exports.editComment = async (req, res) => {
  try {
    const { error, value } = editCommentValidation(req.body);
    if (error) throw error.details[0].message;

    const { content, commentId } = value;

    const comment = await Comment.findById(commentId);
    if (!comment) throw 'No comment defined';

    if (comment.senderId !== req.userId) throw "you can't edit this comment";

    Comment.updateOne({
      content,
    })
      .then(() => res.status(200).send('Comment updated successfully'))
      .catch(() => res.status(500).send('Error during updating comment'));
  } catch (error) {
    res.status(400).send(error);
  }
};

/**
 * A user delete his comment
 * /DELETE
 * @params {commentId}
 */

exports.deleteComment = async (req, res) => {
  try {
    if (!req.body.commentId) throw 'No comment is defined';

    const comment = await Comment.findById(commentId);

    if (comment.senderId !== req.userId) throw "You can't delete this comment";

    comment
      .deleteOne({})
      .then(() => res.status(200).send('Comment deleted successfully'))
      .catch(() => res.status(500).send('Error during deleting comment'));
  } catch (error) {
    res.status(400).send(error);
  }
};
