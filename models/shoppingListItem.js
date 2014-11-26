var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ShoppingListItemSchema = Schema({
    name: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('ShoppingListItem', ShoppingListItemSchema);