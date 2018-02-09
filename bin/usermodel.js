const log = require('tracer').console({ format: "{{message}}  - {{file}}:{{line}}" }).log;
const chalk = require('chalk');
const co = require('co');
const prompt = require('co-prompt');
const mkdirp = require('mkdirp');
const program = require('commander');
const fs = require('fs');

const readlineSync = require('readline-sync');

const defaultfile = {

  makefile: function makedefaultFile(appname, dir, fileName, fileData) {
    if (fs.existsSync(`${appname}/features`, function (err) {
      if (err) {
        log("Error No Feature directory found");
      }
    })) {

      mkdirp(`${appname}/features/${dir}`, function (err) {
        if (err) {
          log("No Feature directory found");
        }
      });
    } else {
      log('Feature directory not exist! \n Either you are not in correct directory.');
    }

    fs.writeFile(`${appname}/features/${dir}/${fileName}.js`, fileData, function (err) {
      if (err) {
        log(`The path ${err.path} not found.`);
        return;
      }
      log(`./features/${dir}/${fileName}.js created`);

    });

  }
};
module.exports = defaultfile;
