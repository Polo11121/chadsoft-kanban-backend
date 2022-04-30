const { StatusCodes } = require('http-status-codes');

const { createUserLimit, updateUserLimit } = require('../controllers/userTaskLimit.controllers');
const UserTaskLimit = require('../models/userTaskLimit');

const userTaskRouter = (router) => {
  router.post('/userTasksLimit', async (req, res) => {
    const response = await createUserLimit(req.body);
    if (response.status === 'invalid') {
      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }

    return res.status(StatusCodes.CREATED).json(response);
  });

  router.put('/userTasksLimit/:id', async (req, res) => {
    const response = await updateUserLimit(req.body, req.params.id);

    if (response.status === 'invalid') {
      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }

    return res.status(StatusCodes.OK).json(response);
  });

  router.get('/userTasksLimit', async (req, res) => {
    try {
      const userLimit = await UserTaskLimit.find();
      res.status(200).json(userLimit);
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  });
};

module.exports = userTaskRouter;
