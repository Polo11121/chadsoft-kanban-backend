/* eslint-disable no-restricted-syntax */
const Column = require('../models/column');
const Task = require('../models/task');
const User = require('../models/user');

const createTask = async (data) => {
  const userToBeAdded = await User.find({ _id: data.idUser });
  const column = await Column.find({ _id: data.column });
  const arrayOfTask = column[0].arrayOfTasks;
  const lenOfArray = arrayOfTask.length;
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
    await Column.findOneAndUpdate(
      {
        _id: data.column,
      },
      { $push: { arrayOfTasks: task._id } },
      { new: true }
    );
    task.index = lenOfArray;
    await task.save();

    return task;
  } catch (err) {
    return { status: 'invalid', message: err };
  }
};

const updateTask = async (data, id) => {
  const addedUser = [];
  const deletedUser = [];
  const getTask = await Task.find({ _id: id });
  if (getTask[0] === undefined) return { status: 'invalid', message: 'Task was not found.' };
  const tabOfId = getTask[0].idUser.toString();
  const columnBefroeUpdated = getTask[0].column;
  let tabOfIdSplited = tabOfId.split(',');
  const newTab = data.idUser;
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
    if (!(columnBefroeUpdated.toString() === task.column.toString())) {
      await Column.findOneAndUpdate(
        {
          _id: columnBefroeUpdated,
        },
        { $pull: { arrayOfTasks: task._id } },
        { new: true }
      );
      await Column.findOneAndUpdate(
        {
          _id: task.column,
        },
        { $push: { arrayOfTasks: task._id } },
        { new: true }
      );
    }
    if (!task || !task._id) return { status: 'invalid', message: 'Task not found' };
    return { data: task, message: 'Updated' };
  } catch (err) {
    return { status: 'invalid', message: err };
  }
};

const updateTaskIndex = async (data, id) => {
  const task = await Task.find({ _id: id });
  if (task[0] === undefined) return { status: 'invalid', message: 'Task was not found.' };
  const column = await Column.find({ _id: data.column });
  const prevColumn = await Column.find({ _id: data.prevColumn });
  const taskIdBefore = task[0].index;
  const arrayOfTasks = column[0].arrayOfTasks;
  const prevArrayOfTasks = prevColumn[0].arrayOfTasks;
  const idPrevColumn = prevColumn[0]._id.toString();
  const idColumn = column[0]._id.toString();
  try {
    const task = await Task.findOneAndUpdate(
      {
        _id: id,
      },
      data,
      { new: true }
    );
    // Jeżeli przesuwam w tej samej kolumnie
    if (idColumn === idPrevColumn) {
      arrayOfTasks.splice(taskIdBefore, 1);
      arrayOfTasks.splice(task.index, 0, task);
      arrayOfTasks.map(async (item, index) => {
        await Task.findOneAndUpdate(
          {
            _id: item,
          },
          { index: index }
        );
      });
      await Column.findOneAndUpdate(
        {
          _id: data.column,
        },
        { arrayOfTasks: arrayOfTasks },
        { new: true }
      );
    } else {
      // Jeżeli przesuwam miedzy innymi kolumnami
      prevArrayOfTasks.splice(taskIdBefore, 1);
      arrayOfTasks.splice(task.index, 0, task);
      arrayOfTasks.map(async (item, index) => {
        await Task.findOneAndUpdate(
          {
            _id: item,
          },
          { index: index }
        );
      });
      prevArrayOfTasks.map(async (item, index) => {
        await Task.findOneAndUpdate(
          {
            _id: item,
          },
          { index: index }
        );
      });
      await Column.findOneAndUpdate(
        {
          _id: data.column,
        },
        { arrayOfTasks: arrayOfTasks },
        { new: true }
      );
      await Column.findOneAndUpdate(
        {
          _id: data.prevColumn,
        },
        { arrayOfTasks: prevArrayOfTasks },
        { new: true }
      );
    }

    if (!task || !task._id) return { status: 'invalid', message: 'Task not found' };
    return { data: task, message: 'Updated' };
  } catch (err) {
    return { status: 'invalid', message: err };
  }
};

const deleteTask = async (id) => {
  const getTask = await Task.find({ _id: id });
  if (getTask[0] === undefined) return { status: 'invalid', message: 'Task was not found.' };
  const columnBefroeDeleted = getTask[0].column;
  const tabOfId = getTask[0].idUser.toString();
  let tabOfIdSplited = tabOfId.split(',');

  if (tabOfIdSplited[0] === '') {
    tabOfIdSplited = [];
  }

  const userToBeDeleted = await User.find({ _id: tabOfIdSplited });

  try {
    const task = await Task.findOneAndDelete({
      _id: id,
    });
    if (!task || !task._id) return { status: 'invalid', message: 'Task was not found.' };

    userToBeDeleted.map(async (taskCou) => {
      await User.findOneAndUpdate(
        {
          _id: taskCou._id,
        },
        { taskCount: taskCou.taskCount - 1 },
        { new: true }
      );
    });
    await Column.findOneAndUpdate(
      {
        _id: columnBefroeDeleted,
      },
      { $pull: { arrayOfTasks: task._id } },
      { new: true }
    );
    return { message: 'Task was deleted.' };
  } catch (err) {
    return { message: err };
  }
};

const addUser = async (data, id) => {
  const taskObject = await Task.find({ _id: id });
  if (taskObject[0] === undefined) return { status: 'invalid', message: 'Task was not found.' };
  const userArray = taskObject[0].idUser;
  const userExist = userArray.includes(data.idUser);
  if (userExist) return { status: 'invalid', message: 'User is already added to task' };
  const userToBeAdded = await User.find({ _id: data.idUser });
  const currentCountTask = userToBeAdded[0].taskCount;

  try {
    const task = await Task.findOneAndUpdate(
      {
        _id: id,
      },
      { $push: { idUser: data.idUser } },
      { new: true }
    );
    const user = await User.findOneAndUpdate(
      {
        _id: data.idUser,
      },
      { taskCount: currentCountTask + 1 },
      { new: true }
    );
    if (!task || !task._id || !user) return { status: 'invalid', message: 'Task not found' };
    return { data: task, message: 'Updated' };
  } catch (err) {
    return { status: 'invalid', message: err };
  }
};

const deleteUser = async (data, id) => {
  const userToBeAdded = await User.find({ _id: data.idUser });
  if (userToBeAdded[0] === undefined) return { status: 'invalid', message: 'User was not found.' };
  const currentCountTask = userToBeAdded[0].taskCount;

  try {
    const task = await Task.findOneAndUpdate(
      {
        _id: id,
      },
      { $pull: { idUser: data.idUser } },
      { new: true }
    );
    const user = await User.findOneAndUpdate(
      {
        _id: data.idUser,
      },
      { taskCount: currentCountTask - 1 },
      { new: true }
    );
    if (!task || !task._id || !user) return { status: 'invalid', message: 'Task not found' };
    return { data: task, message: 'Deleted' };
  } catch (err) {
    return { status: 'invalid', message: err };
  }
};

module.exports = { createTask, updateTask, deleteTask, addUser, deleteUser, updateTaskIndex };
