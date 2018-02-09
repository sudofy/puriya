let json = '';

const makePackageJSON = function (name) {

  json = `{
      "name": "${name}",
      "version": "0.0.0",
      "private": true,
      "scripts": {
        "start": "node ./bin/www",
        "debug": "nodemon ./bin/www",
        "test": "node_modules/.bin/jasmine features/**/*.spec.js ",
        "cleardb": "node_modules/.bin/jasmine spec/dropdb.js",
        "pretest": "npm run cleardb",
        "posttest": "npm run cleardb",
        "lint": "node_modules/.bin/eslint -c ./.eslintrc.json --ext .js **/*.js",
        "validate": "npm ls"
      },
      "_moduleAliases": {
        "@common": "./common/",
        "@config": "./config/index"
      },
      "dependencies": {
        "ascii-art": "1.4.2",
        "assert": "^1.3.0",
        "body-parser": "~1.18.2",
        "cookie-parser": "~1.4.3",
        "cors": "^2.7.1",
        "debug": "~3.1.0",
        "express": "~4.16.2",
        "frisby": "^2.0.10",
        "iron": "^4.0.4",
        "jade": "~1.11.0",
        "jasmine": "^2.8.0",
        "jsonwebtoken": "^8.1.0",
        "lodash": "^4.17.4",
        "module-alias": "^2.0.1",
        "mongoose": "^4.4.7",
        "morgan": "~1.9.0",
        "nodemon": "^1.14.1",
        "passport": "^0.4.0",
        "passport-local": "^1.0.0",
        "passport-local-mongoose": "^4.0.0",
        "precommit-hook": "^3.0.0",
        "q": "^1.4.1",
        "query-string": "^5.0.1",
        "serve-favicon": "~2.4.5",
        "tracer": "^0.8.3",
        "winston": "^2.4.0",
        "winston-papertrail": "^1.0.5"
      },
      "pre-commit": [
        "lint"
      ],
      "devDependencies": {
        "eslint": "^4.15.0",
        "pre-commit": "^1.2.2"
      }
    }
    
`;

  return json;
};

module.exports = makePackageJSON;
