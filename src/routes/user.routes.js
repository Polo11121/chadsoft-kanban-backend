import { StatusCodes } from 'http-status-codes';

import { createUser, deleteUser, editPassword, editUser, loginUser } from '../controllers/user.controllers';
import auth from '../middlewares/verifyToken';
import User from '../models/user';

export const userRoutes = (router) => {
  router.post('/users', async (req, res) => {
    const response = await createUser(req.body);

    if (response.status === 'invalid') {
      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }

    return res.status(StatusCodes.CREATED).json(response);
  });

  router.post('/login', async (req, res) => {
    const response = await loginUser(req.body);
    res.cookie('auth', response.token, { maxAge: process.env.MAX_AGE, httpOnly: true });

    if (response.status === 'invalid') {
      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }

    return res.status(StatusCodes.CREATED).json(response);
  });

  router.patch('/users/:id', auth, async (req, res) => {
    const response = await editUser(req.body, req.params.id);

    if (response.status === 'invalid') {
      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }

    return res.status(StatusCodes.CREATED).json(response);
  });

  router.patch('/users/:id/password', auth, async (req, res) => {
    const response = await editPassword(req.body, req.params.id);

    if (response.status === 'invalid') {
      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }

    return res.status(StatusCodes.CREATED).json(response);
  });

  router.post('/logout', auth, (req, res) => {
    res.clearCookie('auth');
    return res.status(StatusCodes.OK).json({ message: 'Logged out' });
  });

  router.delete('/users/:id', auth, async (req, res) => {
    const response = await deleteUser(req.params.id);
    res.clearCookie('auth');

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
      res.status(400).json({ message: err.message });
    }
  });

  router.get('/users/:id', async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.params.id });
      res.status(200).json(user);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
};
