const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const borrowerSchema = new Schema({
    Name: {type: Schema.Types.ObjectId, ref: 'User'},

},{
  timestamps: true
});

const Borrower = mongoose.model('Borrower', borrowerSchema);