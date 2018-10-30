/* Dependencies */
var listings = require('../controllers/listings.server.controller.js'),
    express = require('express'),
    router = express.Router();

router.use((req, res, next) => {
  var token = req.cookies.token;
  if(token) {
      next();
  } else {
    res.redirect('/');
  }
});

module.exports = router;
