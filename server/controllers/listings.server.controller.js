
/* Dependencies */
var mongoose = require('mongoose'),
    crypto = require('crypto'),
    jwt = require('jsonwebtoken'),
    request = require('request'),
    Listing = require('../models/listings.server.model.js');

const SECRET = "CHANGE_THIS_TO_ENV_VAR"

/*
  In this file, you should use Mongoose queries in order to retrieve/add/remove/update listings.
  On an error you should send a 404 status code, as well as the error message.
  On success (aka no error), you should send the listing(s) as JSON in the response.

  HINT: if you are struggling with implementing these functions, refer back to this tutorial
  from assignment 3 https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications
 */
exports.getCourses = function(req, res) {
    console.log('getting courses');
    
    request('https://one.ufl.edu/apix/soc/schedule/?category=RES&term=2188&last-control-number=0', function (error, response, body) {
      if(error) {
        return res.send(error);
      }
      var courses = JSON.parse(body)[0].COURSES;
      res.send(courses);
    });
}

exports.generateJwt = function(listing) {

   console.log('generate JWT');

   var expiry = new Date();
   expiry.setDate(expiry.getDate() + 7);
   return jwt.sign({
     _id: listing._id,
     email: listing.email,
     role: listing.role,
     name: listing.name,
     exp: parseInt(expiry.getTime() / 1000),
   }, SECRET); // DO NOT KEEP YOUR SECRET IN THE CODE!
 };


exports.login = function(req, res) {
  var login_listing = new Listing(req.body);
  Listing.findOne({email: login_listing.email}, function(err, listing) {
    if (err) {
      console.log(err);
    } else {
       var hash = crypto.pbkdf2Sync(login_listing.password, listing.salt, 1000, 64, 'sha512').toString('hex');
       if(hash == listing.password) {
         var token = exports.generateJwt(listing);
         res.status(200);
         res.setHeader('Set-Cookie','token');
         res.cookie('token', token, { expires: new Date(Date.now() + 9000000), httpOnly: false });
         return res.json({"token": token})
       } else {
         return res.send("There was an error during login. Your password our username was invalid");
       }
    }
  });
}

/* Create a listing */
exports.create = function(req, res) {

  /* Instantiate a Listing */
  var listing = new Listing(req.body);

  /* Hash password */
  var salt = crypto.randomBytes(16).toString('hex');
  listing.salt = salt;
  listing.password = crypto.pbkdf2Sync(listing.password, salt, 1000, 64, 'sha512').toString('hex');

  /* Then save the listing */
  listing.save(function(err) {
    if(err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      var token = exports.generateJwt(listing);
      res.status(200);
      res.setHeader('Set-Cookie','token');
      res.cookie('token', token, { expires: new Date(Date.now() + 9000000), httpOnly: false });
      return res.json({"token": token});
    }
  });
};

/* Show the current listing */
exports.read = function(req, res) {
  /* send back the listing as json from the request */
  res.json(req.listing);
};

/* Update a listing */
exports.update = function(req, res) {
  var listing = req.listing;

  /** TODO **/
  /* Replace the article's properties with the new properties found in req.body */
  /* Save the article */
};

/* Delete a listing */
exports.delete = function(req, res) {
  var listing = req.listing;

  /** TODO **/
  /* Remove the article */
};

/* Retreive all the directory listings, sorted alphabetically by listing code */
exports.list = function(req, res) {
  Listing.find({'role': {$ne: 'Student'}}, "role email name office_hours courses address twitter instructor rateProfessor researchAndJobs", function(err, listing) {
   if(err) {
     console.log(err);
   }
   res.send(listing);
 });
};

/*
  Middleware: find a listing by its ID, then pass it to the next request handler.

  Find the listing using a mongoose query,
        bind it to the request object as the property 'listing',
        then finally call next
 */
exports.listingByID = function(req, res, next, id) {
  Listing.findById(id).exec(function(err, listing) {
    if(err) {
      res.status(400).send(err);
    } else {
      req.listing = listing;
      next();
    }
  });
};
