let ctrl = ``;

module.exports = ctrl;
const makeCtrl = {
  defaultctrl: function () {
    const dctrl = `const User = require('./user.model.js');
    const passport = require('passport');
    const log = require('@common/log');
    const auth = require('@common/auth');
    const serverCodes = require('@common/codes');
    const serverMessages = require('@common/messages');
    exports.listAll = function (req, res, next) {
      User.find({}, function (err, users) {
        if (err) {
          return next({
            message: serverMessages.server.DB_ERROR,
            data: err
          });
        }
        if (users.length === 0) {
          return next({
            message: serverMessages.user.ERROR_NO_USER,
            data: err
          });
        }
        return res.json({
          message: serverMessages.user.SUCCESS_FOUND,
          success: true,
          data: users
        });
      });
    };
    
    exports.register = function (req, res, next) {
      if (!req.body.username || !req.body.password) {
        return next({
          message: serverMessages.server.MISSING_FORM_DATA_ERROR,
          data: null
        });
      }
    
      User.register(new User({ username: req.body.username }), req.body.password, function (err, user) {
        if (err) {
          return next({
            message: serverMessages.server.DB_ERROR,
            data: err
          });
        }
        if (req.body.firstname) {
          user.firstname = req.body.firstname;
        }
    
        if (req.body.lastname) {
          user.lastname = req.body.lastname;
        }
        if (req.body.admin) {
          user.admin = req.body.admin;
        }
        user.save(function (err) {
          if (err) {
            return next({
              message: serverMessages.server.DB_ERROR,
              data: err
            });
          }
          passport.authenticate(\`local\`)(req, res, function () {
            return res.json({
              message: serverMessages.user.SUCCESS_REGISTER,
              success: true,
              data: null
            });
          });
        });
      });
    };
    
    exports.login = function (req, res, next) {
    
      passport.authenticate(\`local\`, function (err, user, info) {
        log(err, user, info);
        if (err) {
          return next({
            message: serverMessages.generic.DB_ERROR,
            data: err
          });
        }
        if (info) {
          return next({
            status: serverCodes.AUTH_ERROR,
            message: info.message,
            data: err
          });
        }
        if (!user) {
          return next({
            message: serverMessages.user.ERROR_NO_USER,
            data: null
          });
        }
    
        req.logIn(user, function (err) {
          log(err);
    
          if (err) {
    
            return next({
              message: serverMessages.user.ERROR_CAN_NOT_LOGIN,
              data: err
            });
          }
    
          auth.getLoginData(user).then(
    
            function (data) {
    
              return res.json({
                message: serverMessages.user.SUCCESS_LOGIN,
                success: true,
                data: data
              });
            },
            function (err) {
              return next({
                message: serverMessages.user.ERROR_LOGIN,
                data: err
              });
    
            }).catch(err => {
            log(err);
          });
    
        });
      })(req, res, next);
    };
    
    exports.verifyUser = function (req, res, next) {
    
      User.findById(req._user._id, function (err, user) {
        if (err) {
          return next({
            message: serverMessages.user.ERROR_FINDING_USER,
            data: err
          });
        }
        if (!user) {
          return next({
            message: serverMessages.user.ERROR_NO_USER,
            data: err
          });
        }
        auth.getLoginData(user).then(
          function (data) {
    
            return res.json({
              message: serverMessages.user.SUCCESS_VERIFY,
              success: true,
              data: data
            });
          },
          function (err) {
    
            return next({
              message: serverMessages.user.ERROR_GET_USERDATA,
              data: err
            });
          }
        );
      });
    };
    
    exports.logout = function (req, res) {
      req.logout();
      res.json({
        message: serverMessages.user.SUCCESS_LOGOUT,
        success: true,
        data: null
      });
    };
    
  `;
    return dctrl;
  },
  makeBasicCtrl: function (name) {

    ctrl = `const ${name}  = require('./${name}.model.js');
    const passport = require('passport');
    const log = require('@common/log');
    const auth = require('@common/auth');
    const serverCodes = require('@common/codes');
    const serverMessages = require('@common/messages');
                exports.listAll = function (req, res, next) {
                  ${name}.find({}, function (err, users) {
                    if (err) throw err;
                    res.json(users);
                  });
                };
                `;

    return ctrl;

  },

  makerouteCtrl: function (name, query, queryModel, methodName) {

    ctrl = ` exports.${methodName}= function (req, res, next) {
                   ${queryModel}.${query}({}, function (err,data ) {
                     if (err) {
                        return res.status(500).json({
                          err: err
                        });
                      }
                      return res.status(200).json({
                        message: '',
                        success: true,
                        data: data 
                      });
               
                  });
                }
                
                
                `;

    return ctrl;

  }

};

module.exports = makeCtrl;
