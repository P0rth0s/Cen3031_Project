/* Dependencies */
var listings = require('../controllers/listings.server.controller.js'),
    express = require('express'),
    atob = require('atob'),
    router = express.Router();

function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(atob(base64));
};

router.use((req, res, next) => {
  var jwt = parseJwt(req.cookies.token);
  console.log('role: ' + jwt.role);
  if(jwt.role == 'TA' || jwt.role == 'Professor') {
    next();
  } else {
    res.redirect('/protected/dashboard');
  }
});

module.exports = router;
