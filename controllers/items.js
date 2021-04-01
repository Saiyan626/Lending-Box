const Item = require('../models/item');
 
 module.exports = {
  index,
  new: newItem,
  create,
  borrowed,
  borrow,
  delete:deleteItem,
  loaned,
  update
};

function loaned(req, res) {
    Item.find({'loaned.user': req.user._id }, function(err, items) {
        res.render('items/loaned', { title: 'My Loaned Items', items });
    });
}

function deleteItem(req, res) {
  // Note the cool "dot" syntax to query on the property of a subdoc
  Index.findOne(
    {'items._id': req.params.id, 'items.userId': req.user._id},
    function(err, index) {
      if (!index || err) return res.redirect(`items/${index._id}`);
      // Remove the subdoc (https://mongoosejs.com/docs/subdocs.html)
      index.items.remove(req.params.id);
      // Save the updated index
      index.save(function(err) {
        // Redirect back to the index's show view
        res.redirect(`items/${index._id}`);
      });
    }
  );
}


function borrow(req, res) {
    Item.findById(req.params.id, function(err, item) {
        item.borrower = {user: req.user._id};
        item.save(function(err) {
            res.redirect('/items/borrowed');    
        })
    });
}


function borrowed(req, res) {
    Item.find({'borrower.user': req.user._id }, function(err, items) {
        res.render('items/borrowed', { title: 'My Borrowed Items', items });
    });
}

function create(req, res) {
    const item = new Item(req.body);
    item.lender = req.user._id;
    item.save(function(err) {
        if(err) return res.render('items/new', { title: 'Add Item'});
        res.redirect('/items');
    });
}

//display ALL available items. (not borrowed)
function index(req, res) {
  Item.find({borrower: undefined}, function(err, items) {
    res.render('items/index', { title: 'Available Items', items });
  });
}

function newItem(req, res) {
    res.render('items/new', { title: 'Add Item'});
}


