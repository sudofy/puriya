#! /usr/bin/env node

var chalk = require('chalk');
var co = require('co');
var prompt = require('co-prompt');
var mkdirp = require('mkdirp');
var program = require('commander');
var fs = require('fs');
var ctrl = require('../files/feature/ctrl');
var log = require('tracer').console({format: "{{message}}  - {{file}}:{{line}}"}).log;
var readlineSync = require('readline-sync');


program

    .arguments('<feature>')

    .action(function () {
        co(function *() {
            var feature = process.argv[2];

            if (!fs.existsSync('./features/' + feature)) {

                log("Please add the feature first of " + feature + " by sudofy-api-feature" );
                process.exit(1);
            }

            var methodName =  readlineSync.question("Name for function :  ");

            var typeOfRoutes = ['GET','POST','PUT','DElETE'] ;

            var type =  typeOfRoutes[readlineSync.keyInSelect(typeOfRoutes,"Type of Route ")];

            var route =  readlineSync.question("Enter Route :  ");

            var queries = ["find","findById","findOne","findByIdAndUpdate","findOneAndUpdate","findOneAndRemove","update","remove","findAll"]

            var query =  queries[readlineSync.keyInSelect(queries,"Enter query :  ")];
            var queryRoute = readlineSync.question("Enter query model:   ")



            fs.readFile('./features/' + feature + '/' + feature + '.route.js', 'utf8', function (err, data) {
                if (err) {
                    return log('Router file not found');
                }

                var newRoute = `router.` + type + `('` + route + `',verify.user,` + feature + `Ctrl.` + methodName + `)`;

                // console.log(newRoute);

                var result = data.replace(/----API----Route/g, methodName + ' for  ' + type + ' route  \n' + newRoute + '\n //----API----Route');

                fs.writeFile('./features/' + feature + '/' + feature + '.route.js', result, function (err) {
                    if (err) return log(err);
                });

            });

            var dataCtrl = ctrl.makerouteCtrl(feature, query, queryRoute,methodName);


            fs.writeFile('./features/' + feature + '/' + '/controllers/' + feature + '.' + methodName + '.ctrl.js', dataCtrl, function (err) {

                if (err) return log('Controller not found');

            });


            fs.readFile('./features/' + feature + '/controllers/' + 'index.ctrl.js', 'utf8', function (err, data) {
                if (err) {
                    return log('Controller not found');
                }

                var importCtrl = `\nexports. ` + methodName + ` = requires ('./features/` + feature + `/` + feature + '.' + methodName + `.ctrl');`;

                // console.log(importCtrl);

                // var result = data.replace(/----API----Route/g, methodName + ' for  ' + type + ' route  \n' + newRoute + '\n //----API----Route');

                fs.appendFile('./features/' + feature + '/controllers/' + 'index.ctrl.js', importCtrl, function (err) {
                    if (err) return log(err);
                });

            });


        })

    })

    .parse(process.argv);