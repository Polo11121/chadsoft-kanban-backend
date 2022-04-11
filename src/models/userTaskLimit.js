const mongoose = require('mongoose');

const UserTaskLimitSchema = mongoose.Schema(
  {
    userTaskLimit: {
      type: Number,
      default: 3,
    },
  },
  { timestamps: true }
);

const UserTaskLimit = mongoose.model('UserTaskLimit', UserTaskLimitSchema);

export default UserTaskLimit;
