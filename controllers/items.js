const Item = require('../models/item');
 
 module.exports = {
  index,
};

 function index(req, res) {
  Item.find({}, function(err, items) {
    res.render('items/index', { title: 'All items', items });
  });
}

