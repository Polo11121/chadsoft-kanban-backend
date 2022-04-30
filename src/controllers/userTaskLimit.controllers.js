import UserTaskLimit from '../models/userTaskLimit';

export const createUserLimit = async (data) => {
  try {
    const userLimit = new UserTaskLimit(data);
    await userLimit.save();

    return userLimit;
  } catch (err) {
    return { status: 'invalid', message: err };
  }
};

export const updateUserLimit = async (data, id) => {
  try {
    const userLimit = await UserTaskLimit.findOneAndUpdate(
      {
        _id: id,
      },
      data,
      { new: true }
    );
    if (!userLimit || !userLimit._id) return { status: 'invalid', message: 'User limit not found' };
    return { message: 'Updated' };
  } catch (err) {
    return { status: 'invalid', message: err };
  }
};
