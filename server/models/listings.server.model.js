/* Import mongoose and define any variables needed to create the schema */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/* Create your schema */
var listingSchema = new Schema({
  //instructor or ta
  role: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  name: {
    type: String,
  },
  //https://stackoverflow.com/questions/19695058/how-to-define-object-in-array-in-mongoose-schema-correctly-with-2d-geo-index refer to for how to push and pop from array
  office_hours: {
    type: Array,
    "default": []
  },
  courses: {
    type: Array,
    "default": []
  },
  address: String,
  password: String,
  //I dont think we need coordiantes as long as we can drop pin on address in map
  /*
  coordinates: {
    latitude: Number,
    longitude: Number
  },
  */
  socialMedia: {
    twitter: String,
    website: String,
    slack: String
  },
  instructor: String, //for if ta
  created_at: Date,
  updated_at: Date
});

/* create a 'pre' function that adds the updated_at (and created_at if not already there) property */
listingSchema.pre('save', function (next) {
  var currentTime = new Date;
  this.updated_at = currentTime;
  if (!this.created_at) {
    this.created_at = currentTime;
  }
  next();
});

/* Use your schema to instantiate a Mongoose model */
var Listing = mongoose.model('Listing', listingSchema);

/* Export the model to make it avaiable to other parts of your Node application */
module.exports = Listing;