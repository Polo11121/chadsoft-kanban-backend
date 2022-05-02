const { StatusCodes } = require('http-status-codes');

const {
  addColumn,
  createColumns,
  removeColumn,
  updateArrayColumns,
} = require('../controllers/arrayColumns.controllers');
const ArrayColumns = require('../models/arrayColumns');

const arrayColumnsRouter = (router) => {
  router.post('/arrayColumns', async (req, res) => {
    const response = await createColumns(req.body, req.params.id);

    if (response.status === 'invalid') {
      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }

    return res.status(StatusCodes.CREATED).json(response);
  });

  router.patch('/arrayColumns/:id', async (req, res) => {
    const response = await updateArrayColumns(req.body, req.params.id);

    if (response.status === 'invalid') {
      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }

    return res.status(StatusCodes.OK).json(response);
  });

  router.patch('/arrayColumns/:id/addColumn', async (req, res) => {
    const response = await addColumn(req.body, req.params.id);

    if (response.status === 'invalid') {
      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }

    return res.status(StatusCodes.OK).json(response);
  });

  router.patch('/arrayColumns/:id/removeColumn', async (req, res) => {
    const response = await removeColumn(req.body, req.params.id);

    if (response.status === 'invalid') {
      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }

    return res.status(StatusCodes.OK).json(response);
  });

  router.get('/arrayColumns', async (req, res) => {
    try {
      const arrayColumn = await ArrayColumns.find();
      res.status(200).json(arrayColumn);
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  });
};

module.exports = arrayColumnsRouter;
