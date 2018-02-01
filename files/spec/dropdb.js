const makedropdb = function () {
  return `const mongoose = require('mongoose');
const config = require('@config');
describe(\`drop db\`, function () {
  it(\`should drop database\`, function (done) {
    mongoose.connect(config.mongoUrl, function () {
      mongoose.connection.db.dropDatabase(function () {
        done();
      });
    });
  });
});
`;
};
module.exports = makedropdb;
