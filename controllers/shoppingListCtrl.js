// Load required packages
var ShoppingListItem = require('../models/shoppingListItem.js');

exports.getAllItems = function(req, res) {
		
	ShoppingListItem.find(function(err, ShoppingListItems) {
	    if (err) {
	        res.send(err);
	    }
	    
	    res.json(ShoppingListItems);
	});
}
	
exports.createListItem = function(req, res) {
    var item = new ShoppingListItem();
    
    item.name = req.body.name;
    
    item.save(function(err, item) {
        if (err) {
            res.send(err);
        }
        
        res.json({
            message: "Item created",
            createdObject: item
        })
    })
}

exports.deleteListItem = function(req, res) {
		ShoppingListItem.remove({
			_id: req.params.shop_id
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