import Member from '../models/member';

export const createMember = async (data) => {
  try {
    const member = new Member(data);
    await member.save();

    return member;
  } catch (err) {
    return { status: 'invalid', message: err };
  }
};

export const deleteMember = async (id) => {
  const member = await Member.findOneAndDelete({
    _id: id,
  });

  if (!member || !member._id) {
    return { status: 'invalid', message: 'Member was not found.' };
  }

  return { message: 'Member was deleted.' };
};
