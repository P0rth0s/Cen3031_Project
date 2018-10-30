/* Dependencies */
var listings = require('../controllers/listings.server.controller.js'),
    express = require('express'),
    router = express.Router();

function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
};

router.use((req, res, next) => {
  var jwt = parseJWT(req.cookies.token);
  if(jwt.role == 'ta' || jwt.role == 'instructor') {
    next();
  } else {
    res.redirect('/protected/dashboard');
  }
});

module.exports = router;
