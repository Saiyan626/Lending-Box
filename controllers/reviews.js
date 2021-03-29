const Lending = require('../models/lending');

module.exports = {
    create,
    delete: deleteReview
  };

  function deleteReview(req, res, next) {
    Lending.findOne({'reviews._id': req.params.id}).then(function(lending) {
      const review = lending.reviews.id(req.params.id);
      // ensure that the review was created by the logged in user
      if (!review.user.equals(req.user._id)) return res.redirect('/');
      review.remove();
      lending.save().then(function() {
        res.redirect(`//${lending._id}`);
      }).catch(function(err) {
        // Let express display an error
        return next(err);
        // Another option
        // res.redirect(`//${lending._id}`);
      });
    });
  }
  
  function create(req, res) {
    Lending.findById(req.params.id, function(err, lending) {
      // Add the user-centric info to req.body (the new review)
      req.body.user = req.user._id;
      req.body.userName = req.user.name;
      req.body.userAvatar = req.user.avatar;
      
      lending.reviews.push(req.body);
      lending.save(function(err) {
        res.redirect(`//${lending._id}`);
      });
    });
  }

