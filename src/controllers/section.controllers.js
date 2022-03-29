import Section from '../models/section';

export const createSection = async (data) => {
  try {
    const section = new Section(data);
    await section.save();

    return section;
  } catch (err) {
    return { status: 'invalid', message: err };
  }
};

export const updateSection = async (data, id) => {
  try {
    const section = await Section.findOneAndUpdate(
      {
        _id: id,
      },
      data,
      { new: true }
    );
    if (!section || !section._id) return { status: 'invalid', message: 'Section not found' };
    return { message: 'Updated' };
  } catch (err) {
    return { status: 'invalid', message: err };
  }
};

export const deleteSection = async (id) => {
  const section = await Section.findOneAndDelete({
    _id: id,
  });

  if (!section || !section._id) {
    return { status: 'invalid', message: 'Section was not found.' };
  }

  return { message: 'Section was deleted.' };
};
