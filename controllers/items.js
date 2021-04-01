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

function update(req, res) {
    Items.findById(req.params.id, function(err, toy) {
        Object.assign(items, req.body);
        items.save(function(err) {
            res.redirect(`/items/${req.params.id}`);
        })
    })
}

function loaned(req, res) {
    Item.find({'loaned.user': req.user._id }, function(err, items) {
        res.render('items/loaned', { title: 'My Loaned Items', items });
    });
}

function deleteItem(req, res) {
  Item.findOneAndDelete(   
    {_id: req.params.id, lender: req.user._id},    
    function(err) {
      res.redirect(`/items`);   
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


