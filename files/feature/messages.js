const messages = {
  defaultusermessage: function () {
    const message = `
    module.exports = {

      SUCCESS_GET_ALLUSER: \`Successfully Fetched All Users\`,
      SUCCESS_LOGIN: \`Login successful!\`,
      SUCCESS_LOGOUT: \`User Logout Successful\`,
      SUCCESS_REGISTER: \`User registered Successfully\`,
      SUCCESS_VERIFY: \`User Verification Successful\`,
      SUCCESS_FOUND: \`Users Found Successfully\`,
      // ERROR
      ERROR_LOGIN: \`Something went wrong while login.\`,
      ERROR_CAN_NOT_LOGIN: \`Could not log in user\`,
      ERROR_FINDING_USER: \`Something went wrong while finding user\`,
      ERROR_GET_USERDATA: \`Something went wrong while getting data\`,
      ERROR_NO_USER: \`No User Found\`
    };
    `;
    return message;
  }
};
module.exports = messages;
