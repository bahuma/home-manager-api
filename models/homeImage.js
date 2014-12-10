var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var HomeImageSchema = Schema({
    url: {
        type: String,
        required: true
    },
    title: {
        type: String,
    }
});

module.exports = mongoose.model('HomeImage', HomeImageSchema);