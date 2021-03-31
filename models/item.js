const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  name:String,
  lender:String,
  borrower:String,
  condition: String,
  timeframe:Date,
}, {
  timestamps: true
});

module.exports = mongoose.model('Item', itemSchema);