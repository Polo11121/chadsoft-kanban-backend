const mongoose = require('mongoose');

const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    taskLimit: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', UserSchema);

export default User;
