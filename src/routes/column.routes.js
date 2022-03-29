import { StatusCodes } from 'http-status-codes';

import { createColumn, deleteColumn, updateColumn } from '../controllers/column.controllers';
import Column from '../models/column';

export const columnRouter = (router) => {
  // endpoint tworzenie kolumn
  router.post('/columns', async (req, res) => {
    const response = await createColumn(req.body);

    if (response.status === 'invalid') {
      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }

    return res.status(StatusCodes.CREATED).json(response);
  });
  // endpoint edytowanie kolumn
  router.put('/columns/:id', async (req, res) => {
    const response = await updateColumn(req.body, req.params.id);

    if (response.status === 'invalid') {
      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }

    return res.status(StatusCodes.OK).json(response);
  });
  // endpoint usuwanie kolumn
  router.delete('/columns/:id', async (req, res) => {
    const response = await deleteColumn(req.params.id);
    if (response.status === 'invalid') {
      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }

    return res.status(StatusCodes.OK).json(response);
  });
  // endpoint pobieranie kolumn
  router.get('/columns', async (req, res) => {
    try {
      const column = await Column.find().populate({ path: 'tasks', select: 'name description idSection idMember' });
      res.status(200).json(column);
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  });
};
