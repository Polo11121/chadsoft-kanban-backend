const mongoose = require('mongoose');

const TaskSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    column: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Column',
      required: true,
    },
    idSection: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Section',
      required: true,
    },
    idMember: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Member',
      required: true,
    },
  },
  { timestamps: true }
);

const Task = mongoose.model('Task', TaskSchema);

export default Task;
