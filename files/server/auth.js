var auth = '';

var makeauth = function () {

    auth = `var log = require('tracer').console({format : "{{message}}  - {{file}}:{{line}}"}).log;
var passport = require('passport');
var Iron = require('iron');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../features/users/user.model');
var config = require('../config/config');
var verify = require('./verify');
var Q = require('q');

//Setup Local Login Strategy
passport.use(new LocalStrategy(User.authenticate()));


passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

exports.getLoginData = function (user, expiry) {
  var userData = user._doc;
  delete userData.hash;
  delete userData.salt;
  delete userData.resetToken;
  delete userData.admin;

  var deferred = Q.defer();
  Iron.seal(userData, config.sealPass, Iron.defaults, function (err, sealed) {
    if (err) {
      deferred.reject(err);
    }
    var token = verify.getToken({data: sealed}, expiry || "30 days");
    var data = {
      token: token,
      user: userData
    };
    deferred.resolve(data);
  });


  return deferred.promise;
};`;

    return auth;

};

module.exports = makeauth;

