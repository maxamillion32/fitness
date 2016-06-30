/**
 * @author : Nimatullah Razmjo <nimatullah.razmjo@gmail.com>
 * @date : June 04, 2016
 * @type {*|exports}
 */

var express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    port = 9000,
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

/*** Configuration files ***/
var config=require('./server/config/config.js')(app, express);

/*** Connect to database*/
require('./server/config/database.js')(mongoose);


require('./server/model/StaticSchema.js')(mongoose);

require('./server/routes.js')(app,config);

var User = mongoose.model('User');

passport.use(new LocalStrategy(
    function(username, password, done) {
        User.findOne({username:username}).exec(function(err, collection) {
            if(collection) {
                return done(null, collection);
            } else {
                return done(null, false);
            }
        });
    }
));

passport.serializeUser(function(user, done) {
    if(user) {
        return done(null, user._id);
    }
});

passport.deserializeUser(function(id, done){
    User.findOne({_id:id}).exec(function(err, user) {
        if(user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    }) ;
});


app.listen(port,function() {
   console.log('Fitness database is running on '+port+' port');
});