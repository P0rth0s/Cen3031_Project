//This file holds any configuration variables we may need
//'config.js' is ignored by git to protect sensitive information, such as your database's username and password
//copy this file's contents to another file 'config.js' and store your MongoLab uri there

// Allows heroku to override the default port by setting this environment variable
var PORT = process.env.PORT ? process.env.PORT : 8080;

module.exports = {
  db: {
    uri: "mongodb://cen3031g6:c1a5511!@ds241133.mlab.com:41133/office_hours" //place the URI of your mongo database here.
  },
  port: PORT
};
