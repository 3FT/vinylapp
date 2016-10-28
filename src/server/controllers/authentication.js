var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');

const duplicateEmailErrCode = 11000;

module.exports.register = function(req, res, next) {

     // Check fields
     if(!req.body.name || !req.body.email || !req.body.password) {

         res.status(400).json({
             "message": "All fields required"
         });
        return;

     }

    var user = new User();

    user.name = req.body.name;
    user.email = req.body.email;
    user.dateJoined = Date.now();
    user.setPassword(req.body.password);

    user.save(function(err) {

        // Send error response if duplicate account
        if (err) {

            if (err.code === duplicateEmailErrCode) {
                err.status = 400;
                err.message = "User or email already exist...";
            }

            return next(err);
        }

        var token;
        token = user.generateJwt();
        res.status(200);
        res.json({
            "token" : token
        });
    });

};


module.exports.login = function(req, res) {

    // Check fields
     if(!req.body.email || !req.body.password) {

         res.status(400).json({
             "message": "All fields required"
         });
         return;

     }

    passport.authenticate('local', function(err, user, info){
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
            res.json({"token" : token});
        } else {
            // If user is not found
            res.status(401).json(info);
        }
    })(req, res);

};



