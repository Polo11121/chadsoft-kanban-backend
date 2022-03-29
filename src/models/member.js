const mongoose = require('mongoose');

const MemberSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Member = mongoose.model('Member', MemberSchema);

export default Member;
