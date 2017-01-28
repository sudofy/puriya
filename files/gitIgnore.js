var ignore = '' ;

var makeGitIgnore = function () {

    ignore = `.idea/
             node_modules/`;

    return ignore;
};

module.exports = makeGitIgnore ;