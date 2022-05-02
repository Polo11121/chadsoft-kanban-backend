const mongoose = require('mongoose');

const SectionSchema = mongoose.Schema(
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

const Section = mongoose.model('Section', SectionSchema);

module.exports = Section;
