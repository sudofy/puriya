var json = '' ;

var makePackageJSON = function (name) {

    json = `{
  "name": "` + name +`",
  "version": "0.0.0",
  "private": true,
  "scripts": {
    "start": "node ./bin/www",
    "debug": "nodemon ./bin/www"
  },
  "dependencies": {
    "ascii-art": "0.0.2-alpha",
    "assert": "^1.3.0",
    "body-parser": "~1.13.2",
    "cookie-parser": "~1.3.5",
    "cors": "^2.7.1",
    "debug": "~2.2.0",
    "express": "~4.13.1",
    "iron": "^4.0.4",
    "jade": "~1.11.0",
    "jsonwebtoken": "^5.7.0",
    "mongoose": "^4.4.7",
    "morgan": "~1.6.1",
    "passport": "^0.3.2",
    "passport-local": "^1.0.0",
    "passport-local-mongoose": "^4.0.0",
    "q": "^1.4.1",
    "serve-favicon": "~2.3.0",
    "tracer": "^0.8.3"
  }
}
`;

    return json ;
};

module.exports = makePackageJSON ;