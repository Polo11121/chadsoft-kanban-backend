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
    color: {
      type: String,
      required: true,
    },
    idTask: {
      type: String,
    },
    idSection: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Section',
      required: true,
    },
    idUser: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'User',
      required: true,
    },
    index: {
      type: Number,
      default: null,
      require: true
    }
  },
  { timestamps: true }
);

const Task = mongoose.model('Task', TaskSchema);

export default Task;
