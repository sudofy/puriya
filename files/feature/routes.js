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
      .get(verify.user,userCtrl.listAll);
    
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
    const express = require('express');
    const router = express.Router();
    const log = require('@common/log');
    const verify = require('@common/verify');
    const ${name}Ctrl = require('./${name}.ctrl.js');
          
          // GET 
          router.get('/', verify.user, ${name}Ctrl.listAll);
          
          //----API----Route\n
          
          module.exports = router;
          `;

    return route;
  },

  addRoute: function (routeAdd, ctrlName, funtionName, type) {

    return `router.${type}(\`${routeAdd}\`, verify.user,${ctrlName}Ctrl.${funtionName});`;

  }

};

module.exports = makeRoute;
