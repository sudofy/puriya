#! /usr/bin/env node

var log = require('tracer').console({format: "{{message}}  - {{file}}:{{line}}"}).log;
var chalk = require('chalk');
var co = require('co');
var prompt = require('co-prompt');
var mkdirp = require('mkdirp');
var program = require('commander');
var fs = require('fs');
var model = require('../files/feature/model');
var ctrl = require('../files/feature/ctrl');
var routes = require('../files/feature/routes');
var readlineSync = require('readline-sync');


function makeDir(dirName) {

    if (fs.existsSync('./features')) {

        mkdirp("./features/" + dirName, function (err) {
            if (err) {
                log("No Feature directory found");
            }
        });
    }
    else
        log('Feature directory not exist! \n Either you are not in correct directory.')


}

function makeFile(dir, fileName, fileData) {
    //console.log(dir);

    makeDir(dir);
    fs.writeFile("./features/" + dir + "/" + fileName + ".js", fileData, function (err) {
        if (err) {
            log("The path " + err.path + " not found.");
            return;
        }
        log("./features/" + dir + "/" + fileName + ".js" + " created");

    });
}


program
    .arguments('<featureName>')
    .action(function (name) {
        var modelData = [];
        var input = readlineSync.questionInt('Number of data  :   ');
        
        
        
        for (var i = 0; i < input; i++) {
            var nameData = readlineSync.question('Key Name :   ');
            var type =  readlineSync.question('Key Type :   ');

            modelData.push({name: nameData, type: type})
        }

        var name = process.argv[2];

        //console.log(model);

        makeFile(name, name + ".modal", model(name, modelData));
        makeFile(name + "/controllers", "index.ctrl", ctrl.makeBasicCtrl(name));
        makeFile(name, name + ".route", routes.makeBasic(name));
        fs.readFile('./routes/route.js', 'utf8', function (err, data) {
            if (err) {
                log("File not found " + err.path);
                return;
            }
            // console.log(data);
            var newImport = `var ` + name + ` = require('../features/` + name + `/` + name + `.route');`;
            var newRoute = `router.use('/` + name + `',` + name + `);'`;
            var result = data.replace(/----API----Route/g, name + ' route  \n' + newRoute + '\n //----API----Route\n');
            var result = result.replace(/----API---import/g, name + ' route Import \n ' + newImport + '\n//----API---import\n')
            fs.writeFile('./routes/route.js', result, function (err) {
                if (err) return log(err);
            });
        });


    })


    .parse(process.argv);