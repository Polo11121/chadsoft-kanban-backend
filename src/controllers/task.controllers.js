/* eslint-disable no-restricted-syntax */
import Task from '../models/task';
import User from '../models/user';

export const createTask = async (data) => {
  const userToBeAdded = await User.find({ _id: data.idMember });

  try {
    const task = new Task(data);
    if (!data.idTask) {
      task.idTask = task._id.toString();
    }
    userToBeAdded.map(async (taskCou) => {
      await User.findOneAndUpdate(
        {
          _id: taskCou._id,
        },
        { taskCount: taskCou.taskCount + 1 },
        { new: true }
      );
    });

    await task.save();

    return task;
  } catch (err) {
    return { status: 'invalid', message: err };
  }
};

export const updateTask = async (data, id) => {
  const addedUser = [];
  const deletedUser = [];
  const getTask = await Task.find({ _id: id });
  const tabOfId = getTask[0].idMember.toString();
  let tabOfIdSplited = tabOfId.split(',');
  const newTab = data.idMember;

  if (tabOfIdSplited[0] === '') {
    tabOfIdSplited = [];
  }

  for (const i in tabOfIdSplited) {
    if (!newTab.includes(tabOfIdSplited[i]) || !tabOfIdSplited[i] === '') {
      deletedUser.push(tabOfIdSplited[i]);
    }
  }

  for (const i in newTab) {
    if (!tabOfIdSplited.includes(newTab[i])) {
      addedUser.push(newTab[i]);
    }
  }

  const userToBeAdded = await User.find({ _id: addedUser });
  const userToBeDeleted = await User.find({ _id: deletedUser });
  try {
    const task = await Task.findOneAndUpdate(
      {
        _id: id,
      },
      data,
      { new: true }
    );
    userToBeAdded.map(async (taskCou) => {
      await User.findOneAndUpdate(
        {
          _id: taskCou._id,
        },
        { taskCount: taskCou.taskCount + 1 },
        { new: true }
      );
    });
    userToBeDeleted.map(async (taskCou) => {
      await User.findOneAndUpdate(
        {
          _id: taskCou._id,
        },
        { taskCount: taskCou.taskCount - 1 },
        { new: true }
      );
    });
    if (!task || !task._id) return { status: 'invalid', message: 'Task not found' };
    return { message: 'Updated' };
  } catch (err) {
    return { status: 'invalid', message: err };
  }
};

export const deleteTask = async (id) => {
  const getTask = await Task.find({ _id: id });
  const tabOfId = getTask[0].idMember.toString();
  let tabOfIdSplited = tabOfId.split(',');

  if (tabOfIdSplited[0] === '') {
    tabOfIdSplited = [];
  }

  const userToBeDeleted = await User.find({ _id: tabOfIdSplited });

  try {
    const task = await Task.findOneAndDelete({
      _id: id,
    });

    userToBeDeleted.map(async (taskCou) => {
      await User.findOneAndUpdate(
        {
          _id: taskCou._id,
        },
        { taskCount: taskCou.taskCount - 1 },
        { new: true }
      );
    });

    if (!task || !task._id) return { status: 'invalid', message: 'Task was not found.' };
    return { message: 'Task was deleted.' };
  } catch (err) {
    return { message: err };
  }
};

export const addUser = async (data, id) => {
  const taskObject = await Task.find({ _id: id });
  const userArray = taskObject[0].idMember;
  const userExist = userArray.includes(data.idMember);
  if (userExist) return { status: 'invalid', message: 'User is already added to task' };
  const userToBeAdded = await User.find({ _id: data.idMember });
  const currentCountTask = userToBeAdded[0].taskCount;

  try {
    const task = await Task.findOneAndUpdate(
      {
        _id: id,
      },
      { $push: { idMember: data.idMember } },
      { new: true }
    );
    const user = await User.findOneAndUpdate(
      {
        _id: data.idMember,
      },
      { taskCount: currentCountTask + 1 },
      { new: true }
    );
    if (!task || !task._id || !user) return { status: 'invalid', message: 'Task not found' };
    return { message: 'Updated' };
  } catch (err) {
    return { status: 'invalid', message: err };
  }
};

export const deleteUser = async (data, id) => {
  const userToBeAdded = await User.find({ _id: data.idMember });
  const currentCountTask = userToBeAdded[0].taskCount;

  try {
    const task = await Task.findOneAndUpdate(
      {
        _id: id,
      },
      { $pull: { idMember: data.idMember } },
      { new: true }
    );
    const user = await User.findOneAndUpdate(
      {
        _id: data.idMember,
      },
      { taskCount: currentCountTask - 1 },
      { new: true }
    );
    if (!task || !task._id || !user) return { status: 'invalid', message: 'Task not found' };
    return { message: 'Deleted' };
  } catch (err) {
    return { status: 'invalid', message: err };
  }
};
