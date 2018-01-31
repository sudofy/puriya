let messages = '';

const makeMessages = function () {

  messages = `const usermessage = require('../features/users/user.messages');
  module.exports = {
    user: usermessage,
    generic: {
      ERRORSESSION: \`Connection not active\`,
      ERROR: \`Something Went Wrong\`,
      SUCCESS: \`API Call Successful\`
    },
    stripe: {
      SUCCESS: \`API Call Successful\`
    },
    server: {
      DB_ERROR: \`Database Error\`,
      JWT_ERROR: \`You are not authenticated, Token Expired\`,
      SEAL_ERROR: \`User verification error\`,
      ACCESS_ERROR: \`You are not authorized to perform this operation\`,
      MISSING_FORM_DATA_ERROR: \`Missing Form Data\`,
      RESTRICTED_FORM_DATA: \`Error in Form Data\`,
      ROUTE_NOT_FOUND: \`Requested route is not found\`,
      MISSING_KEY: \`Missing Service Key in Headers\`,
      INVALID_KEY: \`Service Key is not valid\`,
      KEY_JWT_ERR: \`Can not use SERVICE KEY and USER TOKEN at the same time\`
    }
  };
  
` ;

  return messages;

};

module.exports = makeMessages;

/**
 * Created by daniyal on 29/01/2018.
 */
