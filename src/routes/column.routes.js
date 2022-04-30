const { StatusCodes } = require('http-status-codes');

const { createColumn, deleteColumn, updateColumn } = require('../controllers/column.controllers');
const Column = require('../models/column');

const columnRouter = (router) => {
  router.post('/columns', async (req, res) => {
    const response = await createColumn(req.body);

    if (response.status === 'invalid') {
      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }

    return res.status(StatusCodes.CREATED).json(response);
  });

  router.put('/columns/:id', async (req, res) => {
    const response = await updateColumn(req.body, req.params.id);

    if (response.status === 'invalid') {
      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }

    return res.status(StatusCodes.OK).json(response);
  });

  router.delete('/columns/:id', async (req, res) => {
    const response = await deleteColumn(req.params.id);
    if (response.status === 'invalid') {
      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }

    return res.status(StatusCodes.OK).json(response);
  });

  router.get('/columns', async (req, res) => {
    try {
      const column = await Column.find().populate({
        path: 'tasks',
        select: 'name description idTask idSection idMember color',
      });
      res.status(200).json(column);
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  });
};

module.exports = columnRouter;
