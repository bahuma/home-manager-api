// Load required packages
var CommonEntity = require("../models/commonEntity.js");


exports.getValue = function (req, res) {
    CommonEntity.find({name: new RegExp(req.params.name, "i")}, function (err, entity) {
        if (err) {
            res.send(err);
        }
        
        res.json(entity);
    })
};

exports.setValue = function (req, res) {
    var entity = new CommonEntity();
    
    entity.name = req.paramsq.name;
    entity.value = req.body.value;
    
    entity.save(function(err, createdEntity) {
        if (err) {
            res.send(err);
        }
        
        res.json({
            message: "Value set successfull",
            createdObject: createdEntity
        });
    });
}

module.exports = exports;