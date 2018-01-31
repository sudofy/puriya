#! /usr/bin/env node

const log = require('tracer').console({
  format: `{{message}}  - {{file}}:{{line}}`
}).log;
const co = require('co');
const prompt = require('co-prompt');
const mkdirp = require('mkdirp');
const program = require('commander');
const fs = require('fs');
const readlineSync = require('readline-sync');

const model = require('../files/feature/model');
const ctrl = require('../files/feature/ctrl');
const routes = require('../files/feature/routes');
const usermessages = require('../files/feature/messages');
const userspec = require('../files/feature/spec');
const index = require('../files/config/index');
const defaultConfig = require('../files/config/env/default');
const dev = require('../files/config/env/dev');
const production = require('../files/config/env/production');
const www = require('../files/bin/www');
const auth = require('../files/common/auth');
const database = require('../files/common/database');
const verify = require('../files/common/verify');
const logs = require('../files/common/logs');
const codes = require('../files/common/codes');
const messages = require('../files/common/messages');
const gitIgnore = require('../files/gitIgnore');
const main = require('../files/main');
const packageJson = require('../files/package');
const esLint = require('../files/eslint');
const eslintignore = require('../files/eslintignore');
const route = require('../files/route/route');
const user = require('../bin/usermodel');
let name; function makeDir(dirName) {

  mkdirp(`./${name}/${dirName}`, function (err) {
    if (err) {
      log(err);
    }

  });

}

function makeFile(dir, fileName, fileData) {

  makeDir(dir);

  fs.writeFile(`${name}/${dir}/${fileName}`, fileData, function (err) {
    if (err) {
      return log(err);
    }
    log(`${name}/${dir}/${fileName}created`);

  });
}
program

  .action(function () {
    co(function* () {
      if (process.argv[2].toString() === "feature") {

        const feature = require('./feature.js');

      } else if (process.argv[2].toString() === "router") {

        const feature = require('./routeAdd.js');

      } else {
        name = yield prompt('Name:(generator)   ');

        if (!name) { name = `generator`; }
        mkdirp(`./${name}`, function (err) {
          if (err) {
            return log(err);
          }
        });
        const mongoURL = readlineSync.question('Mongo Url :   ');
        const secretKey = readlineSync.question('Secret Key :   ');
        const sealPass = readlineSync.question('Seal Pass :   ');
        // const s3Region = yeild prompt('s3 Region');
        makeDir('config');
        makeDir('features');
        makeFile('config', 'index.js', index());
        makeFile('config/env', 'default.js', defaultConfig(secretKey, sealPass, mongoURL));
        makeFile('config/env', 'dev.js', dev(secretKey, sealPass, mongoURL));
        makeFile('config/env', 'production.js', production(secretKey, sealPass, mongoURL));
        makeFile('bin', 'www.js', www(name));
        // makeFile('public/styleSheet', 'style.css', cs());
        makeFile('common', 'auth.js', auth());
        makeFile('common', 'database.js', database());
        makeFile('common', 'verify.js', verify());
        makeFile('common', 'log.js', logs());
        makeFile('common', 'codes.js', codes());
        makeFile('common', 'messages.js', messages());
        makeFile('', '.gitIgnore', gitIgnore());
        makeFile('', '.eslintignore', eslintignore());
        makeFile('', '.eslintrc.json', esLint());
        makeFile('', 'main.js', main());
        makeFile('', 'package.json', packageJson(name));
        makeFile('routes', 'router.js', route());
        user.makefile(name, `users`, "user.model", model.defaultmodel());
        user.makefile(name, `users`, "user.ctrl", ctrl.defaultctrl());
        user.makefile(name, `users`, "user.route", routes.defaultroute());
        user.makefile(name, `users`, "user.messages", usermessages.defaultusermessage());
      }
    });
  })

  .parse(process.argv);

