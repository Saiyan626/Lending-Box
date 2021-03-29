var express = require('express');
var router = express.Router();

const isLoggedIn = require('../config/auth');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/new', isLoggedIn, usersCtrl.new);
router.get('/:id', lendingCtrl.show);
router.post('/', isLoggedIn, usersCtrl.create);

module.exports = router;
