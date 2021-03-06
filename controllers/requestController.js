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
  if (error) res.status(400).send(error.details[0].message);

  const { title, description } = value;

  Request.create({ title, description, userId })
    .then(() => res.status(200).send('Request added successfully'))
    .catch(() => res.status(400).send('Failed to add request'));
};
