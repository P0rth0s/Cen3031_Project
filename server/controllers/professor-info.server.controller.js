var mongoose = require('mongoose'),
    crypto = require('crypto'),
    jwt = require('jsonwebtoken'),
    atob = require('atob'),
    Listing = require('../models/listings.server.model.js');

    function parseJwt(token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(atob(base64));
    };

    exports.update = function(req, res) {
      var editListing = req.body;
      console.log(editListing.name);
      console.log(editListing.courses);
      console.log(editListing.officeHours);
      return res.send('updated');
    }

    //change to only show for this user and any of their tas
    exports.list = function(req, res) {
      var jwt = parseJwt(req.cookies.token);
      Listing.find({ $or: [{'email': jwt.email}, {'instructor': jwt.email}]}, "role email name office_hours courses address twitter instructor", function(err, listing) {
       if(err) {
         console.log(err);
       }
       res.send(listing);
     });
    };
