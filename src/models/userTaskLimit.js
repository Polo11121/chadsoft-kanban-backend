const mongoose = require('mongoose');

const UserTaskLimitSchema = mongoose.Schema(
  {
    userTaskLimit: {
      type: Number,
    },
  },
  { timestamps: true }
);

const UserTaskLimit = mongoose.model('UserTaskLimit', UserTaskLimitSchema);

module.exports = UserTaskLimit;
