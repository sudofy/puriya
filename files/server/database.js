var database = '';

var makedatabase = function () {

    database = `var config = require('../config/config');
var mongoose = require('mongoose');
var log = require('tracer').console({format : "{{message}}  - {{file}}:{{line}}"}).log;

exports.connect = function (){
  mongoose.connect(config.mongoUrl);
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function () {
    // we're connected!
    log("MongoDB connected on "+ config.mongoUrl);
    log("###########################################################################");
  });
};

` ;

    return database;

};

module.exports = makedatabase;

/**
 * Created by hii on 03/01/2017.
 */
