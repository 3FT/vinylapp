var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports.profileRead = function(req, res) {

        User.findById(req.payload._id)
            .exec(function(err, user) {
                res.status(200).json(user);
            });

};

