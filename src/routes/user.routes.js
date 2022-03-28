import { StatusCodes } from 'http-status-codes';

import { createUser, deleteUser } from '../controllers/user.controllers';
import User from '../models/user';

export const userRouter = (router) => {
  router.post('/users', async (req, res) => {
    const response = await createUser(req.body);
    if (response.status === 'invalid') {
      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }

    return res.status(StatusCodes.CREATED).json(response);
  });

  router.delete('/users/:id', async (req, res) => {
    const response = await deleteUser(req.params.id);

    if (response.status === 'invalid') {
      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }

    return res.status(StatusCodes.OK).json(response);
  });

  router.get('/users', async (req, res) => {
    try {
      const user = await User.find();
      res.status(200).json(user);
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  });
};
