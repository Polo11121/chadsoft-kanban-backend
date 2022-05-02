const { StatusCodes } = require('http-status-codes');

const {
  addUser,
  createTask,
  deleteUser,
  deleteTask,
  updateTask,
  updateTaskIndex,
} = require('../controllers/task.controllers');
const Task = require('../models/task');

const taskRouter = (router) => {
  router.post('/tasks', async (req, res) => {
    const response = await createTask(req.body);
    if (response.status === 'invalid') {
      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }

    return res.status(StatusCodes.CREATED).json(response);
  });

  router.put('/tasks/:id', async (req, res) => {
    const response = await updateTask(req.body, req.params.id);

    if (response.status === 'invalid') {
      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }

    return res.status(StatusCodes.OK).json(response);
  });

  router.patch('/tasks/:id', async (req, res) => {
    const response = await updateTaskIndex(req.body, req.params.id);

    if (response.status === 'invalid') {
      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }

    return res.status(StatusCodes.OK).json(response);
  });

  router.patch('/tasks/:id/addUser', async (req, res) => {
    const response = await addUser(req.body, req.params.id);

    if (response.status === 'invalid') {
      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }

    return res.status(StatusCodes.OK).json(response);
  });

  router.patch('/tasks/:id/deleteUser', async (req, res) => {
    const response = await deleteUser(req.body, req.params.id);

    if (response.status === 'invalid') {
      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }

    return res.status(StatusCodes.OK).json(response);
  });

  router.delete('/tasks/:id', async (req, res) => {
    const response = await deleteTask(req.params.id);

    if (response.status === 'invalid') {
      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }

    return res.status(StatusCodes.OK).json(response);
  });

  router.get('/tasks', async (req, res) => {
    try {
      const task = await Task.find();
      res.status(200).json(task);
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  });
};

module.exports = taskRouter;
