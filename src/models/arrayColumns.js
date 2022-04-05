const mongoose = require('mongoose');

const ArrayColumnsSchema = mongoose.Schema(
  {
    idColumns: {
      type: Array,
      default: [],
      required: true,
    },
  },
  { timestamps: true }
);

const ArrayColumns = mongoose.model('ArrayColumns', ArrayColumnsSchema);

module.exports = ArrayColumns;
