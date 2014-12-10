// Load required packages
var HomeImage = require('../models/homeImage.js');

exports.getImages = function(req, res) {
    HomeImage.find(function(err, images) {
        if (err) {
            res.send(err);
        }
        
        res.json(images);
    })
}

exports.addImage = function(req, res) {
    var image = new HomeImage();
    
    image.url = req.body.url;
    image.title = req.body.title;
    
    image.save(function(err, image) {
        if (err) {
            res.send(err);
        }
        
        res.json({
            message: "Image successfull added",
            createdObject: image
        });
    })
}

module.exports = exports;