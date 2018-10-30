var path = require('path'),
    express = require('express'),
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    config = require('./config'),
    path = require("path"),
    passport = require("passport"),
    jwt = require('express-jwt'),
    authenticationRouter= require('../routes/authentication.server.routes'),
    listingsRouter = require('../routes/listings.server.routes');

const SECRET = "CHANGE_THIS_TO_ENV_VAR"
    var auth = jwt({
      secret: SECRET,
      userProperty: 'payload'
    });

module.exports.init = function() {
  //connect to database
  mongoose.connect(config.db.uri);

  //initialize app
  var app = express();

  //enable request logging for development debugging
  app.use(morgan('dev'));

  //body parsing middleware
  app.use(bodyParser.json());

  // initialize cookie-parser to allow us access the cookies stored in the browser.
  app.use(cookieParser());

  app.use(passport.initialize());

  app.use('/api/listings', listingsRouter);

  app.use('/protected', authenticationRouter);

  app.use(express.static('client'));

  //app.get('/dashboard', auth, ctrlProfile.profileRead);

  app.get("/protected/dashboard", function(req, res) {
    res.sendFile(path.join(__dirname+'/../../client/dashboard.html'));
  });


  app.get("/register", function(req, res) {
    res.sendFile(path.join(__dirname+'/../../client/register.html'));
  });

/*Go to homepage for all routes not specified */
  app.get("*", function(req, res) {
    res.redirect('/');
  });

  return app;
};
