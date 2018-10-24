var path = require('path'),
    express = require('express'),
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    config = require('./config'),
    path = require("path")
    listingsRouter = require('../routes/listings.server.routes');

module.exports.init = function() {
  //connect to database
  mongoose.connect(config.db.uri);

  //initialize app
  var app = express();

  //enable request logging for development debugging
  app.use(morgan('dev'));

  //body parsing middleware
  app.use(bodyParser.json());


  /**TODO
  Serve static files */
  app.use(express.static('client'));

  /**TODO
  Use the listings router for requests to the api */
  app.use('/api/listings', listingsRouter);


  app.get("/register", function(req, res) {
    res.sendFile(path.join(__dirname+'/../../client/register.html'));
  });


/*Go to homepage for all routes not specified */
  app.get("*", function(req, res) {
    res.redirect('/');
  });

  return app;
};
