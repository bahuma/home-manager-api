var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ShoppingListAutocompleteItemSchema = Schema({
    name: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('ShoppingListAutocompleteItem', ShoppingListAutocompleteItemSchema);