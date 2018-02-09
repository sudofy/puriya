let verify = '';

const makeVerify = function () {

  verify = `const jwt = require('jsonwebtoken');
    const Iron = require('iron');
    const config = require('@config');
    
    exports.getToken = function (user, expiresIn) {
      return jwt.sign(user, config.secretKey, {
        expiresIn: expiresIn || 3600
      });
    };
    
    exports.user = function (req, res, next) {
      // check header or url parameters or post parameters for token
      const token = req.body.token || req.query.token || req.headers[\`x-access-token\`];
    
      // decode token
      if (token) {
        // verifies secret and checks exp
        jwt.verify(token, config.secretKey, function (err, decoded) {
          if (err) {
            const error = new Error(\`You are not authenticated!\`);
            error.status = 401;
            return next(err);
          } else {
            // if everything is good, save to request for use in other routes
            req._user = decoded;
            next();
          }
        });
      } else {
        // if there is no token
        // return an error
        const err = new Error(\`No token provided!\`);
        err.status = 403;
        return next(err);
      }
    };
    
    exports.unseal = function (req, res, next) {
      Iron.unseal(req._user.data, config.sealPass, Iron.defaults, function (err, unsealed) {
        if (err) {
          return res.status(500).json({
            message: \`User verification error\`,
            success: false,
            data: null
          });
        } else {
          req._user = unsealed;
          next();
        }
      });
    };
    
    exports.nocache = function nocache(req, res, next) {
      res.header(\`Cache-Control\`, \`private, no-cache, no-store, must-revalidate\`);
      res.header(\`Expires\`, \`-1\`);
      res.header(\`Pragma\`, \`no-cache\`);
      next();
    };
    
    exports.admin = function (req, res, next) {
      // check header or url parameters or post parameters for token
      const token = req.body.token || req.query.token || req.headers[\`x-access-token\`];
    
      // decode token
      if (token) {
        // verifies secret and checks exp
        jwt.verify(token, config.secretKey, function (err, decoded) {
          if (err) {
            const error = new Error(\`You are not authenticated!\`);
            error.status = 401;
            return next(err);
          } else {
            // if everything is good, save to request for use in other routes
            req._user = decoded;
    
            // check if the user has admin flag true
            if (req._user.admin) {
              next();
            } else {
              res.status(403).json({
                'message': \`You are not authorized to perform this operation!\`
              });
            }
          }
        });
      } else {
        // if there is no token
        // return an error
        const err = new Error(\`No token provided!\`);
        err.status = 403;
        return next(err);
      }
    
    };`;

  return verify;

};

module.exports = makeVerify;

