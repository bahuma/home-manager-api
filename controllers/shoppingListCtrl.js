// Load required packages
var ShoppingListItem = require('../models/shoppingListItem.js');
var ShoppingListAutocompleteItem = require('../models/shoppingListAutocompleteItem.js');
var nodemailer = require("nodemailer");
var smtpTransport = require('nodemailer-smtp-transport');

exports.getAllItems = function(req, res) {
		
	ShoppingListItem.find(function(err, ShoppingListItems) {
	    if (err) {
	        res.send(err);
	    }
	    
	    res.json(ShoppingListItems);
	});
}

exports.searchItem = function(req, res) {
	
	console.log(req.params.name);

    ShoppingListAutocompleteItem.find({name: new RegExp(req.params.name, "i")}, function(err, items) {
        if (err) {
            res.json(err);
        }

        res.json(items);
    });
}
	
exports.createListItem = function(req, res) {
    var item = new ShoppingListItem();
    
    item.name = req.body.name;
    
    item.save(function(err, item) {
        if (err) {
            res.send(err);
        } else {
        	
        	ShoppingListAutocompleteItem.find({name: req.body.name}, function(err, items) {
        	    if (err) {
        	    	res.send(err);
        	    }
        	    
        	    if (items.length === 0) {
        	    	var autocompleteItem = new ShoppingListAutocompleteItem();
        	    	autocompleteItem.name = req.body.name;
        	    	
        	    	autocompleteItem.save(function(err, item) {
        	    		if (err) {
        	    			res.send(err);
        	    		}
        	    	})
        	    }
        	})
        	
        	res.json({
	            message: "Item created",
	            createdObject: item
	        })	
        }
    })
}

exports.deleteListItem = function(req, res) {
	
		ShoppingListItem.remove({
			_id: req.params.item_id
		}, function(err, item) {
			if (err) {
				res.send(err);
			}
			
			res.json({
			    message: "Item successfull deleted"
			})
		});
	}

exports.exportMail = function(req, res) {
	
	ShoppingListItem.find(function(err, ShoppingListItems) {
	    var mailtext = "Here is your Shoppinglist.\nData from " + new Date().getDay() + '.' + new Date().getMonth() + '.' + new Date().getFullYear() + ' ' + new Date().getHours() + ':' + new Date().getMinutes() + '\n\n';
	    
	    ShoppingListItems.forEach(function(item, index, array) {
	    	
	    	mailtext = mailtext + "- " + item.name + '\n';
	    });
	    
	    mailtext = mailtext + '\nGreetings\nYour Home-Manager';
	    
	    
	    
	    var transporter = nodemailer.createTransport({
		    service: 'Gmail',
		    auth: {
		        user: process.env.mail_user,
		        pass: process.env.mail_password
		    }
		});
		
		transporter.sendMail({
			from: "Home-Manager <" + process.env.mail_user + ">",
			to: req.body.email,
			subject: "ShoppingList Export",
			text: mailtext
		}, function(error, info) {
			if (error) {
				console.log(error);
				res.json({
					sent: false,
					message: "Error while sending",
					error: error
				});
			}
			else {
				res.json({
					sent: true,
					message: "Successfully sent"
				})	
			}
		});
	});
}
	
module.exports = exports;