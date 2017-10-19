#! /usr/bin/env node

var log = require('tracer').console({
  format: "{{message}}  - {{file}}:{{line}}"
}).log;
var chalk = require('chalk');
var co = require('co');
var prompt = require('co-prompt');
var mkdirp = require('mkdirp');
var program = require('commander');
var fs = require('fs');
var readlineSync = require('readline-sync');

var model = require('../files/feature/model');
var ctrl = require('../files/feature/ctrl');
var routes = require('../files/feature/routes');

var config = require('../files/config/config');
var www = require('../files/bin/www');
var cs = require('../files/styleSheet/style');
var auth = require('../files/server/auth');
var database = require('../files/server/database');
var verify = require('../files/server/verify');
var view = require('../files/views/view');
var gitIgnore = require('../files/gitIgnore');
var main = require('../files/main');
var packageJson = require('../files/package');
var route = require('../files/route/route');
var user = require('../bin/usermodel');
var name;


function makeDir(dirName) {

 
  mkdirp("./" + name + "/" + dirName, function (err) {
    if (err) {
     
    }

  });

}

function makeFile(dir, fileName, fileData) {

  makeDir(dir);

  fs.writeFile(name + "/" + dir + "/" + fileName, fileData, function (err) {
    if (err) {
      return log(err);
    }
    console.log(name + "/" + dir + "/" + fileName + " created");

  });
}


program
  .action(function () {
    co(function* () {

      name = yield prompt('Name:(generator)   ');

      if (!name)
        name = "generator";
      mkdirp("./" + name, function (err) { });
      var mongoURL = readlineSync.question('Mongo Url :   ') || 'mongodb://localhost:27017/test';
      var secretKey = readlineSync.question('Secret Key :   ');
      var sealPass = readlineSync.question('Seal Pass :   ');

      //var s3Region = yeild prompt('s3 Region');
      makeFile('config', 'config.js', config(secretKey, sealPass, mongoURL));
      makeFile('bin', 'www.js', www(name));
      makeDir('public');
      // makeFile('public/styleSheet', 'style.css', cs());
      makeFile('server', 'auth.js', auth());
      makeFile('server', 'database.js', database());
      makeFile('server', 'verify.js', verify());
      makeFile('views', 'error.jade', view.makeError());
      makeFile('views', 'layout.jade', view.makeLayout());
      makeFile('views', 'index.jade', view.makeIndex());
      makeFile('', '.gitIgnore', gitIgnore());
      makeFile('', 'main.js', main());
      makeFile('', 'package.json', packageJson(name));
      makeDir('features');
      setTimeout(function () {
      
        makeFile('routes', 'router.js', route());
        user.makefile(name, `users`, "user.model", model.defaultmodel());
        user.makefile(name, `users` + "/controllers", "index.ctrl", ctrl.defaultctrl());
        user.makefile(name, `users`, "user.route", routes.defaultroute());

      }, 1000);


    })
  })

  .parse(process.argv);