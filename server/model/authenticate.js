var password_hash = require('password-hash');
var mongoose= require('mongoose');
var password = require('passport');
var LocalStrategy = require('passport-local').Strategy;


module.exports.login = function(req, res) {
    res.render('authenticate/login');
};
module.exports.signup = function(req, res) {
    res.render('authenticate/signup');
};
module.exports.signuppost = function(req, res) {
    res.render('authenticate/login');
};

module.exports.signin = function(req, res, next) {
    var auth = passport.authenticate('local', function(err,user) {
        if(err) return next(err)

        if(!user) res.send({success:false});

        req.logIn(user, function(err) {
           if(err) return next(err);

            res.send({success:true, user: user});
        });
    });

    auth(req, res, next);
}
