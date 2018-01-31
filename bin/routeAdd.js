#! /usr/bin/env node

const chalk = require('chalk');
const co = require('co');
const prompt = require('co-prompt');
const mkdirp = require('mkdirp');
const program = require('commander');
const fs = require('fs');
const ctrl = require('../files/feature/ctrl');
const log = require('tracer').console({ format: "{{message}}  - {{file}}:{{line}}" }).log;
const readlineSync = require('readline-sync');

program

  .arguments('<feature>')

  .action(function () {
    co(function* () {
      const feature = process.argv[3];

      if (!fs.existsSync(`./features/${feature}`)) {

        log(`Please add the feature first of ${feature} by puriya feature`);
        process.exit(1);
      }

      const methodName = readlineSync.question("Name for function :  ");

      const typeOfRoutes = ['get', 'post', 'put', 'delete'];

      const type = typeOfRoutes[readlineSync.keyInSelect(typeOfRoutes, "Type of Route ")];

      const route = readlineSync.question("Enter Route :  ");

      const queries = ["find", "findById", "findOne", "findByIdAndUpdate", "findOneAndUpdate", "findOneAndRemove", "update", "remove", "findAll"];

      const query = queries[readlineSync.keyInSelect(queries, "Enter query :  ")];
      const queryRoute = readlineSync.question("Enter query model:   ");

      fs.readFile(`./features/${feature}/${feature}.route.js`, 'utf8', function (err, data) {
        if (err) {
          return log('Router file not found');
        }

        const newRoute = `router.${type} ( ${route} ,verify.user,${feature}Ctrl.${methodName})`;

        // console.log(newRoute);

        const result = data.replace(/----API----Route/g, `${methodName} for ${type} route \n ${newRoute} \n //----API----Route`);

        fs.writeFile(`./features/${feature}/${feature}.route.js`, result, function (err) {
          if (err) { return log(err); }
        });

      });

      const dataCtrl = ctrl.makerouteCtrl(feature, query, queryRoute, methodName);

      fs.writeFile(`./features/${feature}/${feature}.ctrl.js`, dataCtrl, function (err) {

        if (err) { return log('Controller not found'); }

      });

      fs.readFile(`./features/${feature}/${feature}.ctrl.js`, 'utf8', function (err, data) {
        if (err) {
          return log('Controller not found');
        }

        const importCtrl = `\nexports.${methodName} = require ('./../${feature}.ctrl.js).${methodName};`;

        // console.log(importCtrl);

        // const result = data.replace(/----API----Route/g, methodName + ' for  ' + type + ' route  \n' + newRoute + '\n //----API----Route');

        fs.appendFile(`./features/${feature}/${feature}.ctrl.js`, importCtrl, function (err) {
          if (err) { return log(err); }
        });

      });

    });

  })

  .parse(process.argv);
