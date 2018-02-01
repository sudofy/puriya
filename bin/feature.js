#! /usr/bin/env node

const log = require('tracer').console({ format: "{{message}}  - {{file}}:{{line}}" }).log;
const chalk = require('chalk');
const co = require('co');
const prompt = require('co-prompt');
const mkdirp = require('mkdirp');
const program = require('commander');
const fs = require('fs');
const model = require('../files/feature/model');
const ctrl = require('../files/feature/ctrl');
const routes = require('../files/feature/routes');
const readlineSync = require('readline-sync');

function makeDir(dirName) {

  if (fs.existsSync('./features', function (err) {
    if (err) {
      log("Error No Feature directory found");
    }
  })) {

    mkdirp(`./features/${dirName}`, function (err) {
      if (err) {
        log("No Feature directory found");
      }
    });
  } else {
    log('Feature directory not exist! \n Either you are not in correct directory.');
  }

}

function makeFile(dir, fileName, fileData) {

  makeDir(dir);
  fs.writeFile(`./features/${dir}/${fileName}.js`, fileData, function (err) {
    if (err) {
      log(`The path ${err.path} not found.`);
      return;
    }
    log(`./features/${dir}/${fileName}.js create`);

  });
}

program

  .arguments('<featureName>')
  .action(function (namedata) {
    const modelData = [];
    const input = readlineSync.questionInt('Number of data  :   ');
    for (let i = 0; i < input; i++) {
      let nameData = readlineSync.question('Key Name :   ');
      while (nameData.toString() === "") {
        log("Please enter a valid name");
        nameData = readlineSync.question('Key Name :   ');
      }
      const datatypes = ['Null', 'Number', 'Symbol', 'String', 'Object', 'Array', 'Boolean', 'Date'];
      let index = readlineSync.keyInSelect(datatypes, "Type of Data ");
      let type = datatypes[index];
      ;
      while (index.toString() === '-1') {
        log("Please select a valid data type from the given list");
        index = readlineSync.keyInSelect(datatypes, "Type of Data ");
        type = datatypes[index];
      }
      modelData.push({ name: nameData, type: type });
    }

    const name = process.argv[3];
    makeFile(name, `${name}.spec`, '');
    makeFile(name, `${name}.model`, model.addNewModal(name, modelData));
    makeFile(name, `${name}.ctrl`, ctrl.makeBasicCtrl(name));
    makeFile(name, `${name}.route`, routes.makeBasic(name));
    log('all files created ');
    fs.readFile('./routes/router.js', 'utf8', function (err, data) {
      if (err) {
        log(`File not found  ${err.path}`);
        return;
      }
      // console.log(data);
      const newImport = `const  ${name}  = require(\`../features/${name}/${name}.route\`);`;
      const newRoute = `router.use(\`/${name}\`,${name});`;
      log('all files created1 ');
      let result = data.replace(/----API----Route/, `${name} route  \n ${newRoute}  \n //----API----Route`);
      result = result.replace(/----API---import/, `${name} route Import \n ${newImport} \n//----API---import\n`);
      fs.writeFile('./routes/router.js', result, function (err) {
        if (err) { return log(err); }
        log(result);
      });
    });

  })

  .parse(process.argv);
