let route = ``;

module.exports = route;
const makeRoute = {
  defaultroute: function () {
    const droute = `const express = require('express');
  
    const router = express.Router();
    
    const verify = require('@common/verify');
    
    const userCtrl = require('./user.ctrl.js');

     /**
     * 
     * @api {get} /
     * @apiName listAll
     * @apiGroup User
     * @apiVersion  major.minor.patch
     * 
     * 
     * @apiParam  {String} paramName description
     * 
     * @apiSuccess (200) {type} name description
     * 
     * @apiParamExample  {type} Request-Example:
       {
           property : value
       }
     * 
     * 
     * @apiSuccessExample {type} Success-Response:
       {
           property : value
       }
     * 
     * 
     */

    // GET users
    router.route(\`/\`)
      .get(verify.user,userCtrl.listAll);
    
    /**
     * 
     * @api {post} /register
     * @apiName register
     * @apiGroup User
     * @apiVersion  major.minor.patch
     * 
     * 
     * @apiParam  {String} paramName description
     * 
     * @apiSuccess (200) {type} name description
     * 
     * @apiParamExample  {type} Request-Example:
       {
           property : value
       }
     * 
     * 
     * @apiSuccessExample {type} Success-Response:
       {
           property : value
       }
     * 
     * 
     */

    // Add user
    router.route(\`/register\`)
      .post(userCtrl.register);

      /**
       * 
       * @api {post} /login
       * @apiName login
       * @apiGroup User
       * @apiVersion  major.minor.patch
       * 
       * 
       * @apiParam  {String} paramName description
       * 
       * @apiSuccess (200) {type} name description
       * 
       * @apiParamExample  {type} Request-Example:
         {
             property : value
         }
       * 
       * 
       * @apiSuccessExample {type} Success-Response:
         {
             property : value
         }
       * 
       * 
       */

    // Login
    router.route(\`/login\`)
      .post(userCtrl.login);

      /**
       * 
       * @api {get} /logout
       * @apiName logout
       * @apiGroup User
       * @apiVersion  major.minor.patch
       * 
       * 
       * @apiParam  {String} paramName description
       * 
       * @apiSuccess (200) {type} name description
       * 
       * @apiParamExample  {type} Request-Example:
         {
             property : value
         }
       * 
       * 
       * @apiSuccessExample {type} Success-Response:
         {
             property : value
         }
       * 
       * 
       */

    // Logout
    router.route(\`/logout\`)
      .get(userCtrl.logout);

      /**
       * 
       * @api {get} /me
       * @apiName verifyUser
       * @apiGroup User
       * @apiVersion  major.minor.patch
       * 
       * 
       * @apiParam  {String} paramName description
       * 
       * @apiSuccess (200) {type} name description
       * 
       * @apiParamExample  {type} Request-Example:
         {
             property : value
         }
       * 
       * 
       * @apiSuccessExample {type} Success-Response:
         {
             property : value
         }
       * 
       * 
       */

    // Verify me
    
    router.route(\`/me\`)
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

      /**
       * 
       * @api {get} /me
       * @apiName listAll
       * @apiGroup ${name}
       * @apiVersion  major.minor.patch
       * 
       * 
       * @apiParam  {String} paramName description
       * 
       * @apiSuccess (200) {type} name description
       * 
       * @apiParamExample  {type} Request-Example:
         {
             property : value
         }
       * 
       * 
       * @apiSuccessExample {type} Success-Response:
         {
             property : value
         }
       * 
       * 
       */
      
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
