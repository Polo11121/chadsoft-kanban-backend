import { StatusCodes } from 'http-status-codes';

import { addMember, createTask, deleteMember, deleteTask, updateTask } from '../controllers/task.controllers';

export const taskRouter = (router) => {
  // endpoint tworzenie zadań
  router.post('/tasks', async (req, res) => {
    const response = await createTask(req.body);
    if (response.status === 'invalid') {
      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }

    return res.status(StatusCodes.CREATED).json(response);
  });
  // endpoint edytowanie zadań
  router.put('/tasks/:id', async (req, res) => {
    const response = await updateTask(req.body, req.params.id);

    if (response.status === 'invalid') {
      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }

    return res.status(StatusCodes.OK).json(response);
  });

  // endpoint dodawnaie użytkownika do zadania
  router.patch('/tasks/:id/addMember', async (req, res) => {
    const response = await addMember(req.body, req.params.id);

    if (response.status === 'invalid') {
      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }

    return res.status(StatusCodes.OK).json(response);
  });
  // endpoint usuwanie użytkownika z zadania
  router.patch('/tasks/:id/deleteMember', async (req, res) => {
    const response = await deleteMember(req.body, req.params.id);

    if (response.status === 'invalid') {
      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }

    return res.status(StatusCodes.OK).json(response);
  });
  // endpoint usuwanie zadania
  router.delete('/tasks/:id', async (req, res) => {
    const response = await deleteTask(req.params.id);

    if (response.status === 'invalid') {
      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }

    return res.status(StatusCodes.OK).json(response);
  });
};
