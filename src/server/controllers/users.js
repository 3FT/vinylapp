var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports.getUser = function(req, res) {

        User.findById(req.params.id).select({email: 1, name: 1, dateJoined: 1})
            .exec(function(err, user) {
                res.status(200).json(user);
            });
};

module.exports.getAllUsers = function(req, res) {

    User.find({}).select({email: 1, name: 1, dateJoined: 1})
        .exec(function(err, users) {
            res.status(200).json(users);
        });
};

module.exports.updateUser = function(req, res, next) {

    User.findById(req.params.id, function (err, user) {
        // handle null
        user._id = req.body._id;
        user.email = req.body.email;
        if (req.body.password) {
            user.setPassword(req.body.password);
        }

        user.save(function(err, updatedUser) {

            if (err) {return next(err);}

            var token = updatedUser.generateJwt();
            res.status(200);
            res.json({
                'token' : token
            });
        });
    });
};

module.exports.createUser = function(req, res, next) {
    var duplicateEmailErrCode = 11000;

    // Check fields
    if(!req.body._id || !req.body.email || !req.body.password) {

        res.status(400).json({
            'message': 'All fields required'
        });
        return;

    }

    var user = new User();

    user._id = req.body._id;
    user.email = req.body.email;
    user.dateJoined = Date.now();
    user.setPassword(req.body.password);

    user.save(function(err) {
        // Send error response if duplicate account
        if (err) {
            if (err.code === duplicateEmailErrCode) {
                err.status = 400;
                err.message = 'User or email already exist...';
            }

            return next(err);
        }

        var token;
        token = user.generateJwt();
        res.status(200);
        res.json({
            'token' : token
        });
    });
};

