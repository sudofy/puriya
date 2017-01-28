var routes = '';

var route = {

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