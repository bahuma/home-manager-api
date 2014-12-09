// Load required packages
var ShoppingListItem = require('../models/shoppingListItem.js');
var ShoppingListAutocompleteItem = require('../models/shoppingListAutocompleteItem.js');

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
	
module.exports = exports;