const { requestValidation } = require('../validation/requestValidation');
const { Request } = require('../models/Request');

/**
 * Add a request
 * /POST
 * @params {title, description, userId}
 */
exports.addRequest = (req, res) => {
  const userId = req.userId;

  const { error, value } = requestValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { title, description } = value;

  Request.create({ title, description, userId })
    .then(() => res.status(200).send('Request added successfully'))
    .catch(() => res.status(400).send('Failed to add request'));
};

/**
 * Edit a request
 * /PUT
 * @params {title, description, userId, requestId(id)}
 */
exports.editRequest = async (req, res) => {
  try {
    //Check if the request ID is sent in the req.body
    if (!req.body.id) throw 'No request defined';

    const userId = req.userId;

    const request = await Request.findOne({ _id: req.body.id });
    if (!request) throw "This request doesn't exist";
    if (request.userId !== userId) throw "You can't edit this request";

    const { error, value } = requestValidation(req.body);
    if (error) res.status(400).send(error.details[0].message);

    const { title, description } = value;

    request
      .update({ title, description })
      .then(() => res.status(200).send('Request updated successfully'))
      .catch(() => res.status(400).send('Failed to update request'));
  } catch (error) {
    res.status(400).send(error);
  }
};

/**
 * Delete a request
 * /DELETE
 * @params {requestId(id), userId}
 */
exports.deleteRequest = async (req, res) => {
  try {
    //Check if the request ID is sent in the req.body
    if (!req.body.id) throw 'No request defined';

    const userId = req.userId;

    const request = await Request.findOne({ _id: req.body.id });
    if (!request) throw "This request doesn't exist";
    if (request.userId !== userId) throw "You can't delete this request";

    request
      .deleteOne({ _id: req.body.id })
      .then(() => res.status(200).send('Request deleted successfully'))
      .catch(() => res.status(400).send('Failed delete request'));
  } catch (error) {
    res.status(400).send(error);
  }
};

/**
 * Get the user's requests
 * /GET
 * @params {userId}
 */
exports.getUserRequests = (req, res) => {
  Request.find({ userId: req.userId })
    .then((data) => res.status(200).send(data))
    .catch(() => res.status(400).send('Failed to get your requests'));
};
