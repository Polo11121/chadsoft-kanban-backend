import Task from '../models/task';

export const createTask = async (data) => {
  try {
    const task = new Task(data);
    await task.save();

    return task;
  } catch (err) {
    return { status: 'invalid', message: err };
  }
};

export const updateTask = async (data, id) => {
  try {
    const task = await Task.findOneAndUpdate(
      {
        _id: id,
      },
      data,
      { new: true }
    );
    if (!task || !task._id) return { status: 'invalid', message: 'Task not found' };
    return { message: 'Updated' };
  } catch (err) {
    return { status: 'invalid', message: err };
  }
};

export const deleteTask = async (id) => {
  const task = await Task.findOneAndDelete({
    _id: id,
  });

  if (!task || !task._id) {
    return { status: 'invalid', message: 'Task was not found.' };
  }

  return { message: 'Task was deleted.' };
};
