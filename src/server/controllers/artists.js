var mongoose = require('mongoose');
var Artist = mongoose.model('Artist');

// CRUD operations on artists
module.exports.getAllArtists = function(req, res) {
    Artist.find({}, function (err, artists) {
        res.json(artists);
    });
};

module.exports.getArtist = function(req, res, next) {
    Artist.find({_id : req.params.id}, function (err, artist) {
        if (err) {return next(err);}
        res.json(artist[0]);
    });
};

module.exports.createArtist = function(req, res, next) {
    var artist = new Artist();
    /* jshint ignore:start */
    for (var attrname in req.body) { artist[attrname] = req.body[attrname];}
    /* jshint ignore:end */
    artist.addedBy = req.payload._id;
    artist.dateAdded = Date.now();
    artist.save(function(err, artist) {
        if (err) {
            return next(err);
        }
        // respond with ID
        res.status(201).json({_id: artist.id});
    });
};

module.exports.deleteArtist = function(req, res, next) {
    Artist.findById(req.params.id, function(err, artist) {
        if (!artist) {return next(new Error(req.params.id + ' doesn\'t exist'));}
        artist.remove(function(err) {
            if (err) {
                return next(err);
            }
            res.status(200).json({message: 'deleted ' + artist.id});
        });
    });
};

module.exports.updateArtist = function(req, res, next) {
    Artist.findById(req.params.id, function (err, artist) {
        if (!artist) {return next(new Error(req.params.id + ' doesn\'t exist'));}
        /* jshint ignore:start */
        for (var attrname in req.body) {artist[attrname] = req.body[attrname];}
        /* jshint ignore:end */
        artist.save(function (err, updatedArtist) {

            if (err) {return next(err);}
            res.status(200).json({message: 'updated artist'});
        });
    });
};