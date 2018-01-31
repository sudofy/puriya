let ignore = '';

const makeGitIgnore = function () {

  ignore = `.idea/
             node_modules/`;

  return ignore;
};

module.exports = makeGitIgnore;
