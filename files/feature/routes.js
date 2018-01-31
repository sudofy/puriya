let route = ``;

module.exports = route;
const makeRoute = {
  defaultroute: function () {
    const droute = `const express = require('express');
  
    const router = express.Router();
    
    const verify = require('@common/verify');
    
    const userCtrl = require('./user.ctrl.js');
    
    // GET users
    router.route(\`/\`)
      .get(userCtrl.listAll);
    
    // Add user
    router.route(\`/ register\`)
      .post(userCtrl.register);
    
    // Login
    router.route(\`/ login\`)
      .post(userCtrl.login);
    
    // Logout
    router.route(\`/ logout\`)
      .get(userCtrl.logout);
    
    // Verify me
    
    router.route(\`/ me\`)
      .get(verify.nocache, verify.user, verify.unseal, userCtrl.verifyUser);
    
    module.exports = router;
  `;
    return droute;
  },
  makeBasic: function (name) {

    route = `
          var express = require('express');\n
          var router = express.Router();\n
          var log = require('tracer').console({format: "{{message}}  - {{file}}:{{line}}"}).log;\n
          var verify = require('../../server/verify');\n
          var ${featurenName}Ctrl = require('./controllers/index.ctrl.js');\n
          
          // GET \n
          router.get('/', verify.user, ${featurenName}Ctrl.listAll);\n
          
          //----API----Route\n
          
          module.exports = router;\n
          `;

    return route;
  },

  addRoute: function (routeAdd, ctrlName, funtionName, type) {

    return `router.${type}(${routeAdd}, verify.user,${ctrlName}.${funtionName})`;

  }

};

module.exports = makeRoute;
