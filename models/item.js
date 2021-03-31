const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemsSchema = new Schema({
  name: {type: String, required: true, unique: true},
  condition: Date
}, {
  timestamps: true
});

module.exports = mongoose.model('Performer', performerSchema);