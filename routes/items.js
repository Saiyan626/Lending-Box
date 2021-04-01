const express = require('express');
const router = express.Router();
const itemsCtrl = require('../controllers/items');
const isLoggedIn = require('../config/auth');


router.get('/', isLoggedIn, itemsCtrl.index);
router.get('/borrowed', isLoggedIn, itemsCtrl.borrowed);
router.get('/new', isLoggedIn, itemsCtrl.new);
router.post('/', isLoggedIn, itemsCtrl.create);
router.post('/:id/borrow', isLoggedIn, itemsCtrl.borrow);


module.exports = router;