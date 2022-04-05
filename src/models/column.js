const mongoose = require('mongoose');

const columnSchema = mongoose.Schema(
  {
    color: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    numberOfTasks: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

columnSchema.virtual('tasks', {
  ref: 'Task',
  localField: '_id',
  foreignField: 'column',
});

columnSchema.set('toObject', { virtuals: true });
columnSchema.set('toJSON', { virtuals: true });

const Column = mongoose.model('Column', columnSchema);

module.exports = Column;
