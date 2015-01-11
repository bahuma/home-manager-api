var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var User = new Schema({
    name: {
        type: String,
        required: true
    },
    fullname: {
        type: String,
        require: true
    },
    hasTasks: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('User', User);