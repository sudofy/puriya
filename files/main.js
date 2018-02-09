let main = '';

const makeMain = function () {

  main = `const express = require('express');
    const path = require('path');
    const logger = require('morgan');
    const cookieParser = require('cookie-parser');
    const bodyParser = require('body-parser');
    const database = require('@common/database');
    
    const passport = require('passport');
    const cors = require('cors');
    
    const app = express();
    database.connect();
    // view engine setup
    app.set(\`views\`, path.join(__dirname, \`views\`));
    app.set(\`view engine\`, \`jade\`);
    
    // uncomment after placing your favicon in /public
    // app.use(favicon(path.join(__dirname, \`public\`, \`favicon.ico\`)));
    app.use(cors());
    app.use(logger(\`dev\`));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    
    app.use(express.static(path.join(__dirname, \`public\`)));
    
    // Setup Passport.js for token based user auth
    require('@common/auth');
    app.use(passport.initialize());
    
    module.exports = app;
    
` ;

  return main;

};

module.exports = makeMain;
