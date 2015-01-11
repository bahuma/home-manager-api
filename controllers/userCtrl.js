// Load required packages
var User = require("../models/user.js");

exports.getUsers = function (req, res) {
    User.find(function(err, users) {
        if (err) {
            res.send(err);
        }
        
        res.json(users);
    });
};

exports.createUser = function (req, res) {
    var user = new User();
    
    user.name = req.body.name;
    user.fullname = req.body.fullname;
    
    if (req.body.hasTasks) {
        user.hasTasks = req.body.hasTasks;
    }
    
    user.save(function(err, user){
        if (err) {
            res.send(err);
        }
        
        res.json({
            message: "User created successfull",
            userCreated: user
        });
    });
};

module.exports = exports;