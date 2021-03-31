const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const borrowerSchema = new Schema({
    Name: {type: Schema.Types.ObjectId, ref: 'User'},

},{
  timestamps: true
});

const itemSchema = new Schema({
  name: String,
  lender: {type: Schema.Types.ObjectId, ref: 'User'},
  borrower: borrowerSchema,
  condition: String,
}, {
  timestamps: true
});

module.exports = mongoose.model('Item', itemSchema);