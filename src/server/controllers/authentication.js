var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports.login = function(req, res) {

    // Check fields
     if(!req.body.email || !req.body.password) {

         res.status(400).json({
             'message': 'All fields required'
         });
         return;
     }

    passport.authenticate('local', function(err, user, info, next){
        var token;

        // If Passport throws/catches an error
        if (err) {
            err.status=404;
            return next(err);
        }

        // If a user is found
        if(user){
            token = user.generateJwt();
            res.status(200);
            res.json({'token' : token});
        } else {
            // If user is not found
            res.status(401).json(info);
        }
    })(req, res);
};



