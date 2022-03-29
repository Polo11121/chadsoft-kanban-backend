import { StatusCodes } from 'http-status-codes';

import { addColumn, createColumns, removeColumn, updateArrayColumns } from '../controllers/arrayColumns.controllers';
import ArrayColumns from '../models/arrayColumns';

export const arrayColumnsRouter = (router) => {
  router.post('/arrayColumns', async (req, res) => {
    const response = await createColumns(req.body, req.params.id);

    if (response.status === 'invalid') {
      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }

    return res.status(StatusCodes.OK).json(response);
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
