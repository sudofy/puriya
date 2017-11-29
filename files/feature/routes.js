var routes = ``;
module.exports=routes;
var route = {
defaultroute:function(){ var droute=`var express = require('express');\n
var router = express.Router();\n
var log = require('tracer').console({format: "{{message}}  - {{file}}:{{line}}"}).log;\n
var verify = require('../../server/verify');\n
var userCtrl = require('./controllers/index.ctrl.js');\n


//GET users \n
router.get('/', verify.user, userCtrl.listAll); \n

//Add user \n
router.post('/register', userCtrl.register); \n

//Login \n
router.post('/login', userCtrl.login); \n

//Logout \n
router.get('/logout', userCtrl.logout); \n

//Verify me \n
router.get('/me', verify.nocache, verify.user, verify.unseal, userCtrl.verifyUser); \n
module.exports = router;\n` 
return droute },
    makeBasic: function (featurenName) {
      
        routes = `
        var express = require('express');\n
        var router = express.Router();\n
        var log = require('tracer').console({format: "{{message}}  - {{file}}:{{line}}"}).log;\n
        var verify = require('../../server/verify');\n
        var ` + featurenName + `Ctrl = require('./controllers/index.ctrl.js');\n
        
        // GET \n
        router.get('/', verify.user, ` + featurenName + `Ctrl.listAll);\n
        
        //----API----Route\n
        
        module.exports = router;\n
        `;

        return routes;
    },

    addRoute: function (routeAdd, ctrlName, funtionName, type) {

        return `router.` + type + `('` + routeAdd + `, verify.user,` + ctrlName + `.` + funtionName + `)`;

    }

};


module.exports = route;