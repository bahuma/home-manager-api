// BASE SETUP
// =============================================================================

// call the packages we need
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var passport = require('passport');
var config = require('./config.json');

var mongoose = require('mongoose');
var options = { server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }, 
                replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } } };
var dbString = 'mongodb://'+ config.database.user +':'+ config.database.password +'@'+ config.database.host +':'+ config.database.port +'/'+ config.database.name;
mongoose.connect(dbString, options);

// configure app to user bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Use the passport package in our application
app.use(passport.initialize());


// Enables CORS
var enableCORS = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
 
    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};

app.use(enableCORS);
var port = process.env.PORT || 8080; // set our port

// ROUTES FOR OUR API
// =============================================================================

var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
	next(); // make sure we go to the next routes and don't stop here
});

var test = function() {
	return false;
}


// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);