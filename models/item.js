const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const WEEK = 7 * 24 * 60 * 60 * 1000;

const borrowerSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    dueDate: {
      type: Date, 
      default: function () {
        return new Date(Date.now() + WEEK);
      }
    }
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