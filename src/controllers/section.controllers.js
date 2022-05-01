const Section = require('../models/section');

const createSection = async (data) => {
  try {
    const section = new Section(data);
    await section.save();

    return section;
  } catch (err) {
    return { status: 'invalid', message: err };
  }
};

const updateSection = async (data, id) => {
  try {
    const section = await Section.findOneAndUpdate(
      {
        _id: id,
      },
      data,
      { new: true }
    );
    if (!section || !section._id) return { status: 'invalid', message: 'Section not found' };
    return {data: section, message: 'Updated' };
  } catch (err) {
    return { status: 'invalid', message: err };
  }
};

const deleteSection = async (id) => {
  const section = await Section.findOneAndDelete({
    _id: id,
  });

  if (!section || !section._id) {
    return { status: 'invalid', message: 'Section was not found.' };
  }

  return { message: 'Section was deleted.' };
};

module.exports = { createSection, updateSection, deleteSection };
