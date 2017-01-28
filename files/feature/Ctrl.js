var ctrl = '';


var makeCtrl = {

    makeBasicCtrl: function (name) {


        ctrl = `var ` + name + ` = require('./../` + name + `.model.js');
                var passport = require('passport');
                var Verify = require('../../../server/verify.js');
                var log = require('tracer').console({format: "{{message}}  - {{file}}:{{line}}"}).log;
                var auth = require('../../../server/auth');
                `;

        return ctrl;

    },

    makerouteCtrl: function (name, query, queryModel, methodName) {

        ctrl = `var ` + name + ` = require('./../` + name + `.model.js');\n
                var ` + queryModel + ` =  require('./../../` + queryModel + `/` + queryModel + `.model.js');\n
                var Verify = require('../../../server/verify.js');\n
                var log = require('tracer').console({format: "{{message}}  - {{file}}:{{line}}"}).log;\n
                var auth = require('../../../server/auth');\n
                 exports.` + methodName + ` = function (req, res, next) {\n
                  ` + queryModel + `.` + query + `({}, function (err,data ) {\n
                     if (err) {\n
                        return res.status(500).json({\n
                          err: err\n
                        });\n
                      }\n
                      return res.status(200).json({\n
                        message: '',\n
                        success: true,\n
                        data: data \n
                      });\n
               \n
                  });\n
                }\n
                
                
                `;

        return ctrl;

    }


};

module.exports = makeCtrl;