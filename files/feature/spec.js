const spec = ``;

module.exports = spec;
const makeRoute = {
  defaultspec: function () {
    const userspec = `const config = require('../../spec/config');
    const frisby = require('frisby');
    const Joi = frisby.Joi;
    let token;
    
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
      it (\`it should login the user\`, done => {
        frisby
          .post (\`\${config.domain}/user/login\`, {
            username: \`dany600\`,
            password: \`12345\`,
          })
          .expect (\`status\`, 200)
          .expect (\`json\`, {
            message: \`Login successful!\`,
          })
          .then (res => {
            token = res._body.data.token;
          })
          .done (done);
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
            headers: {
              'x-access-token': token,
              origin: config.domain,
              'Content-Type': 'application/json',
            }
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
    return `describe(\`${describemessage} :\`, done => {`;
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
          .done(done);
      });
`;
  },

  addimports: function () {
    return `const config = require('../../spec/config');
    const frisby = require('frisby');
    const Joi = frisby.Joi;
    
    `;
  }

};

module.exports = makeRoute;
