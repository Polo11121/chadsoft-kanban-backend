import User from '../models/user';

export const createUser = async (data) => {
  try {
    const user = new User(data);
    await user.save();

    return user;
  } catch (err) {
    return { status: 'invalid', message: err };
  }
};

export const deleteUser = async (id) => {
  const user = await User.findOneAndDelete({
    _id: id,
  });

  if (!user || !user._id) {
    return { status: 'invalid', message: 'User was not found.' };
  }

  return { message: 'User was deleted.' };
};
