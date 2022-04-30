const mongoose = require('mongoose');

const columnSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    numberOfTasks: {
      type: Number,
      required: true,
    },
    arrayOfTasks: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Task',
      default: [],
      required: true,
    },
  },
  { timestamps: true }
);

const Column = mongoose.model('Column', columnSchema);

export default Column;
