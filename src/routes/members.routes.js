import { StatusCodes } from 'http-status-codes';

import { createMember, deleteMember } from '../controllers/member.controllers';
import Member from '../models/member';

export const memberRouter = (router) => {
  // endpoint tworzenie użytkowników
  router.post('/member', async (req, res) => {
    const response = await createMember(req.body);
    if (response.status === 'invalid') {
      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }

    return res.status(StatusCodes.CREATED).json(response);
  });
  // endpoint usuwanie użytkowników
  router.delete('/member/:id', async (req, res) => {
    const response = await deleteMember(req.params.id);

    if (response.status === 'invalid') {
      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }

    return res.status(StatusCodes.OK).json(response);
  });
  // endpoint pobieranie użytkowników
  router.get('/member', async (req, res) => {
    try {
      const member = await Member.find();
      res.status(200).json(member);
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  });
};
