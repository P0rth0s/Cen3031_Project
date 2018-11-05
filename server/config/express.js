var path = require("path"),
  express = require("express"),
  mongoose = require("mongoose"),
  morgan = require("morgan"),
  bodyParser = require("body-parser"),
  cookieParser = require("cookie-parser"),
  config = require("./config"),
  path = require("path"),
  jwt = require("express-jwt"),
  authenticationRouter = require("../routes/authentication.server.routes"),
  privRouter = require("../routes/privilege.server.routes"),
  listingsRouter = require("../routes/listings.server.routes")
  profRouter = require("../routes/professor-info.server.routes");

const SECRET = "CHANGE_THIS_TO_ENV_VAR";
var auth = jwt({
  secret: SECRET,
  userProperty: "payload"
});

module.exports.init = function() {
  //connect to database
  mongoose.connect(config.db.uri);

  //initialize app
  var app = express();

  //enable request logging for development debugging
  app.use(morgan("dev"));

  //body parsing middleware
  app.use(bodyParser.json());

  // initialize cookie-parser to allow us access the cookies stored in the browser.
  app.use(cookieParser());

  app.use("/api/listings", listingsRouter);

  app.use("/protected", authenticationRouter);

  app.use("/priv", privRouter);

  app.use("/api/profssor-info", profRouter)

  app.use(express.static("client"));

  //app.get('/dashboard', auth, ctrlProfile.profileRead);

  app.get("/protected/dashboard", function(req, res) {
    res.sendFile(path.join(__dirname + "/../../client/dashboard.html"));
  });

  app.get("/protected/priv/upload", function(req, res) {
    res.sendFile(path.join(__dirname + "/../../client/upload.html"));
  });

  app.get("/test", function(req, res) {
    res.sendFile(path.join(__dirname + "/../../client/professor-info.html"));
  });

  app.get("/", function(req, res) {
    var token = req.cookies.token;
    if(token == undefined) {
      res.sendFile(path.join(__dirname + "/../../client/login.html"));
    } else {
      res.redirect('/protected/dashboard');
    }
  });

  /*Go to homepage for all routes not specified */
  app.get("*", function(req, res) {
    res.redirect("/");
  });

  return app;
};
