// BASE SETUP
// =============================================================================

// call the packages we need
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var dbString = "";
var mongoose = require('mongoose');
var options = { server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }, 
                replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } } };

var shoppingListCtrl = require('./controllers/shoppingListCtrl.js');
var commonCtrl = require('./controllers/commonCtrl.js');
var userCtrl = require('./controllers/userCtrl.js');

// configure app to user bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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
    var newDBString = "";
    
    if(req.query.dev == "true") 
        newDBString = 'mongodb://'+ process.env.dev_database_user +':'+ process.env.dev_database_password +'@'+ process.env.dev_database_host +':'+ process.env.dev_database_port +'/'+ process.env.dev_database_name;
    else
        newDBString = 'mongodb://'+ process.env.live_database_user +':'+ process.env.live_database_password +'@'+ process.env.live_database_host +':'+ process.env.live_database_port +'/'+ process.env.live_database_name;
    
    if (dbString == "") {
        dbString = newDBString;    
        mongoose.connect(dbString, options);
    }
    
    if (dbString != newDBString) {
        dbString = newDBString;
        mongoose.disconnect();
        mongoose.connect(dbString, options);
    }
    
    next(); // make sure we go to the next routes and don't stop here
});

// Shoppinglist
router.route('/shoppinglist')
    .get(shoppingListCtrl.getAllItems)
    .post(shoppingListCtrl.createListItem);

router.route('/shoppinglist/:item_id')
    .delete(shoppingListCtrl.deleteListItem);
    
router.route('/shoppinglist/search/:name')
    .get(shoppingListCtrl.searchItem);
    
router.route('/shoppinglist/mail')
    .post(shoppingListCtrl.exportMail);

// Common
router.route('/common/:name')
    .get(commonCtrl.getValue)
    .post(commonCtrl.setValue);
    
// User
router.route('/user')
    .get(userCtrl.getUsers)
    .post(userCtrl.createUser);
    
    
    
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);