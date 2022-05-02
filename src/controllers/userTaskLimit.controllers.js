const UserTaskLimit = require('../models/userTaskLimit');

const createUserLimit = async (data) => {
  try {
    const userLimit = new UserTaskLimit(data);
    await userLimit.save();

    return userLimit;
  } catch (err) {
    return { status: 'invalid', message: err };
  }
};

const updateUserLimit = async (data, id) => {
  try {
    const userLimit = await UserTaskLimit.findOneAndUpdate(
      {
        _id: id,
      },
      data,
      { new: true }
    );
    if (!userLimit || !userLimit._id) return { status: 'invalid', message: 'User limit not found' };
    return { data: userLimit, message: 'Updated' };
  } catch (err) {
    return { status: 'invalid', message: err };
  }
};

module.exports = { createUserLimit, updateUserLimit };
