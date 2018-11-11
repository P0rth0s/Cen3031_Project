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
      var listing = req.body;
      var editListing = {};
      console.log('listingEmail: ' + listing.email);
      if(listing.name != undefined) {
        editListing.name = listing.name;
      }
      if(listing.officeHours != undefined) {
        editListing.office_hours = listing.officeHours;
      }
      if(listing.courses != undefined) {
        editListing.courses = listing.courses;
      }
      if(listing.twitter != undefined) {
        editListing.twitter = listing.twitter;
      }
      if(listing.address != undefined) {
        editListing.address = listing.address;
      }
      if(listing.rateProfessor != undefined) {
        editListing.rateProfessor = listing.rateProfessor;
      }
      if(listing.researchAndJobs != undefined) {
        editListing.researchAndJobs = listing.researchAndJobs;
      }
      Listing.update({'email': listing.email}, editListing, { multi: false }, function(err, num) {
        if(err) {
          return res.send('err: ' + err);
        } else {
          console.log('num updated: ' + num);
          return res.send('updated');
        }
      })
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