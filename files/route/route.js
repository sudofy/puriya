let route = '';
const makeRoute = function () {

  route = `   const express = require('express');
  // default user route Import
  const user = require('../features/users/user.route');
  
  module.exports = function (app) {
  
    const router = express.Router();
    // default user route
    router.use(\`/user\`, user);
  
    app.use(\`/api\`, router);
  
  };
`;
  return route;

};
module.exports = makeRoute;
