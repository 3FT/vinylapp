var mongoose = require('mongoose');
var Vinyl = mongoose.model('Vinyl');


var multer  = require('multer');


var storage = multer.diskStorage({

    destination: './public/uploads/',
    filename: function (req, file, cb) {
        //var fileName = req.body.artist_id + req.body.album + file.fieldname + '-' + Date.now();
        var fileName = file.originalname;
        req.body[file.fieldname] = '/uploads/' + fileName;
        cb(null, fileName);
    }
});


var upload = multer({ storage: storage });

// middleware for file uploads
module.exports.processFiles = upload.fields([{
    name: 'frontCover', maxCount: 1
}, {
    name: 'backCover', maxCount: 1
}]);


// CRUD operations on vinyls
module.exports.getAllVinyls = function(req, res) {

    Vinyl.find({}, function (err, vinyls) {
        res.json(vinyls);
    });

};

module.exports.getVinyl = function(req, res, next) {

    Vinyl.find({_id : req.params.id}, function (err, vinyl) {

        if (err) {return next(err);}
        res.json(vinyl[0]);

    });

};

module.exports.createVinyl = function(req, res, next) {
    
    var vinyl = new Vinyl();

    for (var attrname in req.body) { vinyl[attrname] = req.body[attrname];}

    vinyl.addedBy = req.payload.name;
    vinyl.dateAdded = Date.now();
    vinyl.save(function(err, vinyl) {

        if (err) {
            return next(err);
        }
        // respond with ID
        res.status(201).json({_id: vinyl.id});

    });

};

module.exports.updateVinyl = function(req, res, next) {

    Vinyl.findById(req.params.id, function (err, vinyl) {

        for (var attrname in req.body) { vinyl[attrname] = req.body[attrname];}

        vinyl.save(function (err, updatedVinyl) {

            if (err) {return next(err);}
            res.status(200).json({message: 'updated vinyl'});
        });
    });

};

module.exports.updateVinylFile = function(req, res, next) {
    Vinyl.findById(req.params.id, function (err, vinyl) {
        vinyl.images.frontCover = req.body.frontCover;
        vinyl.images.backCover = req.body.backCover;

        if (err) {
            return next(err);
        }

        vinyl.save(function (err, updatedVinyl) {
            if (err) {
                return next(err);
            }
            res.status(200).json({message: 'updated vinyl file'});
        });
    });
};

module.exports.deleteVinyl = function(req, res, next) {
     Vinyl.findById(req.params.id, function (err, vinyl) {

         vinyl.remove(function (err) {
             if (err) {
                 return next(err);
             }
             res.status(200).json({message: 'deleted vinyl'});
         });
     });
};

module.exports.checkOwnership = function(req, res, next) {
    Vinyl.findById(req.params.id, function (err, vinyl) {
        if (err) { return next(err);}

        // check Vinyl owner
        if (req.payload.name !== vinyl.addedBy) {
            res.status(403).json({message: 'unauthorized'});
            return;
        }
    });

    next();
};


module.exports.vinylJsonFilter = function(req, res, next) {
    var filter = {
        album: req.body.album,
        artist_id: req.body.artist_id,
        tracklist: req.body.tracklist,
        year: req.body.year
    };

    req.body = filter;
    next();
};

module.exports.updateAverageRating = function(req, res, next) {
    var sum = 0;

    var reviews = req.body.reviews;

    for (var i = 0; i < reviews.length; i++) {
        sum += reviews[i].stars;
    }

    var avg = sum / reviews.length;
    req.body.averageRating = avg;

    next();
};
