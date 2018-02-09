let configindex = '';

const makeConfigindex = function () {

  configindex = `const defaultCfg = require('./env/default');
  const _ = require('lodash');
  const env = process.env.NODE_ENV;
  module.exports = env;
  const config = defaultCfg;
  module.exports = config;
  const overrides = env !== null && typeof env !== \`undefined\` ? require(\`./ env / '\$'{ env } \`).config : null;
  if (env !== null && typeof env !== \`undefined\`) {
    _.merge(config, overrides);
  }`;

  return configindex;

};

module.exports = makeConfigindex;
