const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const testSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    }
  }, {timestamps: true},
)

module.exports = mongoose.model('Test', testSchema);
