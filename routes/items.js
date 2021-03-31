const express = require('express');
const router = express.Router();
const itemsCtrl = require('../controllers/items');

router.get('/', itemsCtrl.index);
router.get('/items/loaned/new', itemsCtrl.index);


module.exports = router;