import { StatusCodes } from 'http-status-codes';

import { createSection, deleteSection, updateSection } from '../controllers/section.controllers';
import Section from '../models/section';

export const sectionRouter = (router) => {
  // endpoint tworzenie sekcji
  router.post('/sections', async (req, res) => {
    const response = await createSection(req.body);
    if (response.status === 'invalid') {
      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }

    return res.status(StatusCodes.CREATED).json(response);
  });
  // endpoint edycja sekcji
  router.put('/sections/:id', async (req, res) => {
    const response = await updateSection(req.body, req.params.id);

    if (response.status === 'invalid') {
      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }

    return res.status(StatusCodes.OK).json(response);
  });
  // endpoint usuwanie sekcji
  router.delete('/sections/:id', async (req, res) => {
    const response = await deleteSection(req.params.id);

    if (response.status === 'invalid') {
      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }

    return res.status(StatusCodes.OK).json(response);
  });
  // endpoint pobieranie sekcji
  router.get('/sections', async (req, res) => {
    try {
      const section = await Section.find();
      res.status(200).json(section);
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  });
};
