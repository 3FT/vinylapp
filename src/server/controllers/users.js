var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports.getUser = function(req, res) {

        User.findById(req.params.id).select({email : 1, name : 1, dateJoined : 1})
            .exec(function(err, user) {
                res.status(200).json(user);
            });

};


module.exports.getAllUsers = function(req, res) {

    User.find({}).select({email : 1, name : 1, dateJoined : 1})
        .exec(function(err, users) {
            res.status(200).json(users);
        });

};