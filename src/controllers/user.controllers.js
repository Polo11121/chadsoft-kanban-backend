import bcrypt from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';

import userUpdated from '../constants/userUpdated';
import User from '../models/user';
import { editValidation, loginValidation, passwdEditValidation, registerValidation } from '../routes/validation';

export const createUser = async (data) => {
  const { error } = registerValidation(data);
  if (error) return { status: 'invalid', message: error.details[0].message };

  const userExist = await User.find({ email: data.email });

  if (userExist[0]) return { status: 'invalid', message: 'Email already exists' };

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(data.password, salt);
  try {
    const user = await User.create({
      name: data.name,
      surname: data.surname,
      photo: data.photo,
      email: data.email,
      password: hashedPassword,
    });

    return user;
  } catch (err) {
    return { status: 'invalid', message: 'Email already exists', err };
  }
};

export const loginUser = async (data) => {
  const { error } = loginValidation(data);
  if (error) return { status: 'invalid', message: error.details[0].message };

  const activeUser = await User.find({ email: data.email });
  if (!activeUser[0]) return { status: 'invalid', message: 'Email or password is wrong' };

  const validPass = await bcrypt.compare(data.password, activeUser[0].password);
  if (!validPass) return { status: 'invalid', message: 'Email or password is wrong' };

  const token = jsonwebtoken.sign({ _id: activeUser[0]._id }, process.env.TOKEN_SECRET);

  return { id: activeUser[0].id, token, message: `Welcome ${activeUser[0].name}` };
};

export const editUser = async (data, id) => {
  const { error } = editValidation(data);
  if (error) return { status: 'invalid', message: error.details[0].message };

  return userUpdated({ name: data.name, surname: data.surname, photo: data.photo }, id);
};

export const editPassword = async (data, id) => {
  const { error } = passwdEditValidation(data);
  if (error) return { status: 'invalid', message: error.details[0].message };

  const user = await User.findOne({ _id: id });
  if (!user) return { status: 'invalid', message: 'User not found.' };

  const validOldPass = await bcrypt.compare(data.password, user.password);
  if (!validOldPass) return { status: 'invalid', message: 'Old password is wrong.' };

  if (data.newPassword !== data.newPasswordRepeat) return { status: 'invalid', message: 'The passwords do not match.' };

  const difOldNewPass = await bcrypt.compare(data.newPasswordRepeat, user.password);
  if (difOldNewPass) return { status: 'invalid', message: 'The old password and the new password must be different.' };

  const newPass = data.newPasswordRepeat;

  const salt = await bcrypt.genSalt();
  const newPassword = await bcrypt.hash(newPass, salt);

  return userUpdated({ password: newPassword }, id);
};

export const deleteUser = async (id) => {
  const userExist = await User.findOne({ _id: id });

  if (!userExist) return { status: 'invalid', message: 'User not found' };

  await User.findOneAndDelete({
    _id: id,
  });

  return { message: 'The account has been deleted' };
};
