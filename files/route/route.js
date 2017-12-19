var route = '';

var makeRoute = function () {

  route = `   var express = require('express');\n
                var log = require('tracer').console({format : "{{message}}  - {{file}}:{{line}}"}).log;\n
                var verify = require('../server/verify');\n
                // default user route Import
                var user = require('../features/users/user.route');\n
                //----API---import\n
                
                
                module.exports = function (app, config, models) {\n
                  var router = express.Router();\n
                
                  
                
                
                //default user route
                  router.use('/user', user);
                  //----API----Routes   \n
                  app.use('/api', router);\n
                };\n
              `;

  return route;

};

module.exports = makeRoute;