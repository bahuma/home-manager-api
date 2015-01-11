var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var CommonEntity = new Schema({
    name: {
        type: String,
        required: true
    },
    value: {
        type: String,
        require: true
    }
});

module.exports = mongoose.model('CommonEntity', CommonEntity);