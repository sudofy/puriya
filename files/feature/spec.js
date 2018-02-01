const spec = ``;

module.exports = spec;
const makeRoute = {
  defaultspec: function () {
    const userspec = `require('module-alias/register');
    const config = require('../../spec/config');
    const frisby = require('frisby');
    const Joi = frisby.Joi;
    
    describe(\`User register :\`, () => {
      it(\`should save information of user\`, done => {
    
        frisby
          .post(\`\${config.domain}/user/register\`, {
    
            username: \`dany600\`,
            password: \`12345\`,
            firstname: \`faizan\`,
            lastname: \`saeed\`,
          })
          .expect(\`status\`, 200)
          .expect(\`json\`, {
            message: \`User registered Successfully\`
          })
          .done(done);
    
      });
    
    });
    describe(\`User Login :\`, () => {
      it(\`it should login the user\`, done => {
        frisby
          .post(\`\${config.domain}/user/login\`, {
            username: \`dany600\`,
            password: \`12345\`,
          })
          .expect(\`status\`, 200)
          .expect(\`json\`, {
    
            message: \`Login successful!\`,
            success: true,
            data: {
              token: Joi.string(),
              user: {
                firstname: \` \`,
                lastname: \` \`,
                __v: 0,
                username: \`dany600\`,
                _id: Joi.string()
              }
            }
          })
    
          .done(done);
    
      });
    
      it(\`it should  fail to login the user with username missing\`, done => {
        frisby
          .post(\`\${config.domain}/user/login\`, {
            password: \`12345\`
          })
          .expect(\`status\`, 401)
          .done(done);
    
      });
    
      it(\`it should  fail to login the user with password missing\`, done => {
        frisby
          .post(\`\${config.domain}/user/login\`, {
            username: \`dany600\`
          })
          .expect(\`status\`, 401)
          .done(done);
    
      });
    });
    describe(\`User Logout :\`, () => {
      it(\`it should logout the user\`, done => {
        frisby
          .get(\`\${config.domain}/user/logout\`, {
    
          })
          .expect(\`status\`, 200)
          .done(done);
    
      });
    });
    describe(\`Get all users :\`, () => {
      it(\`it should fail to get all users\`, done => {
        frisby
          .get(\`\${config.domain}/user/\`, {
    
          })
          .expect(\`status\`, 403)
          .expect(\`json\`, {
            message: \`No token provided!\`,
            success: false
          })
          .done(done);
    
      });
    });
    
  `;
    return userspec;
  },
  addtestsuite: function (describemessage) {
    return `describe(\`${describemessage} :\`, () => {`;
  },
  addtest: function (itmessage, method, route, body, status, expectType, expectfield) {
    return `
      it(\`${itmessage}\`, () => {
        frisby
          .${method}(\`${route}\`, {
              ${body}
          })
          .expect(\`status\`, ${status})
          .expect(\`${expectType}\`, {
           ${expectfield}
          })
          .done();
      });
`;
  }

};

module.exports = makeRoute;
