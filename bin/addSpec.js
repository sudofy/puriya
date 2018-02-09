#! /usr/bin/env node

const chalk = require('chalk');
const co = require('co');
const prompt = require('co-prompt');
const mkdirp = require('mkdirp');
const program = require('commander');
const fs = require('fs');
const ctrl = require('../files/feature/ctrl');
const routes = require('../files/feature/routes');
const log = require('tracer').console({ format: "{{message}}  - {{file}}:{{line}}" }).log;
const readlineSync = require('readline-sync');
const spec = require('../files/feature/spec');
program

  .arguments('<feature>')

  .action(function () {
    co(function* () {
      const feature = process.argv[3];

      if (!fs.existsSync(`./features/${feature}`)) {

        log(`Please add the feature first of ${feature} by puriya feature`);
        process.exit(1);
      }
      let result;
      let bodyfield = '';
      const noofTestSuites = readlineSync.question("No of testsuite :  ");
      for (let i = 0; i < noofTestSuites; i++) {
        const describeMessage = readlineSync.question("Message for describe block :  ");
        result = spec.addimports() + spec.addtestsuite(describeMessage);
        const noofTestCases = readlineSync.question("No of testcases :  ");
        for (let j = 0; j < noofTestCases; j++) {
          const itMessage = readlineSync.question("Message for it block :  ");
          const typeOfRoutes = ['get', 'post', 'put', 'delete'];

          const type = typeOfRoutes[readlineSync.keyInSelect(typeOfRoutes, "Method of http")];
          const route = readlineSync.question("Enter Route :  ");
          if (type.toString() === 'post' || type.toString() === 'put') {
            const noofBodyFields = readlineSync.question("No of body fields :  ");
            for (let k = 0; k < noofBodyFields; k++) {
              const body = readlineSync.question("Body fields :  ");
              bodyfield = bodyfield + body;
            }
          }
          const expectStatus = readlineSync.question("Expect status:   ");
          const expectType = ['json', 'josnTypes'];

          const typeofexpect = expectType[readlineSync.keyInSelect(expectType, "Expect Type")];
          const noofExpectedfield = readlineSync.question("No of Expectedfield:   ");
          let expectfield = '';
          for (let l = 0; l < noofExpectedfield; l++) {
            const field = readlineSync.question("Expect fields :  ");
            expectfield = expectfield + field;
          }
          result = result + spec.addtest(itMessage, type, route, bodyfield, expectStatus, typeofexpect, expectfield);
        }
        result = `${result}});`;
      }
      fs.readFile(`./features/${feature}/${feature}.spec.js`, 'utf8', function (err, data) {
        if (err) {
          return log('Router file not found');
        }

        fs.writeFile(`./features/${feature}/${feature}.spec.js`, result, function (err) {
          if (err) { return log(err); }
        });

      });

    });

  })

  .parse(process.argv);
