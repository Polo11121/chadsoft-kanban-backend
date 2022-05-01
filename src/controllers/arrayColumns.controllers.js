const ArrayColumns = require('../models/arrayColumns');

const createColumns = async (data) => {
  try {
    const column = new ArrayColumns(data);
    await column.save();

    return { data: column, message: 'ArrayColumns was created' };
  } catch (err) {
    return { status: 'invalid', message: err };
  }
};

const updateArrayColumns = async (data, id) => {
  try {
    const arrayColumns = await ArrayColumns.findOneAndUpdate(
      {
        _id: id,
      },
      data,
      { new: true }
    );
    if (!arrayColumns || !arrayColumns._id) return { status: 'invalid', message: 'ArrayColumns not found' };
    return {data: arrayColumns, message: 'Updated' };
  } catch (err) {
    return { status: 'invalid', message: err };
  }
};

const addColumn = async (data, id) => {
  const arrayColumnsObject = await ArrayColumns.find({ _id: id });
  const columnsArray = arrayColumnsObject[0].idColumns;
  const columnExist = columnsArray.includes(data.idColumns);

  if (columnExist) return { status: 'invalid', message: 'Column already added' };

  try {
    const arrayColumns = await ArrayColumns.findOneAndUpdate(
      {
        _id: id,
      },
      { $push: { idColumns: data.idColumns } },
      { new: true }
    );
    if (!arrayColumns || !arrayColumns._id) return { status: 'invalid', message: 'ArrayColumns not found' };
    return {data: arrayColumns, message: 'Updated' };
  } catch (err) {
    return { status: 'invalid', message: err };
  }
};

const removeColumn = async (data, id) => {
  const arrayColumnsObject = await ArrayColumns.find({ _id: id });
  const columnsArray = arrayColumnsObject[0].idColumns;
  const columnExist = columnsArray.includes(data.idColumns);

  if (!columnExist) return { status: 'invalid', message: 'Column not found' };

  try {
    const arrayColumns = await ArrayColumns.findOneAndUpdate(
      {
        _id: id,
      },
      { $pull: { idColumns: data.idColumns } },
      { new: true }
    );
    if (!arrayColumns || !arrayColumns._id) return { status: 'invalid', message: 'ArrayColumns not found' };
    return {data: arrayColumns, message: 'Deleted' };
  } catch (err) {
    return { status: 'invalid', message: err };
  }
};

module.exports = { createColumns, updateArrayColumns, addColumn, removeColumn };
