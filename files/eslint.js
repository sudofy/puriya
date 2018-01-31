let eslint = '';

const makeEslint = function (name) {

  eslint = `{
      "env": {
        "commonjs": true,
        "es6": true,
        "node": true,
        "jasmine": true
      },
      "rules": {
        "indent": [
          2,
          2,
          {
            "SwitchCase": 1
          }
        ],
        "linebreak-style": [
          "error",
          "unix"
        ],
        "quotes": [
          "error",
          "single",
          {
            "allowTemplateLiterals": true
          }
        ],
        "semi": [
          "error",
          "always"
        ],
        "yoda": [
          "error",
          "never"
        ],
        "for-direction": "error",
        "no-template-curly-in-string": "error",
        "no-sparse-arrays": "error",
        "array-callback-return": "error",
        "class-methods-use-this": "error",
        "curly": "error",
        "default-case": "error",
        "eqeqeq": "error",
        "no-alert": "error",
        "no-empty-function": "error",
        "no-extra-bind": "error",
        "no-loop-func": "error",
        "no-multi-spaces": "error",
        "no-multi-str": "error",
        "no-new-func": "error",
        "no-new-wrappers": "error",
        "no-param-reassign": "error",
        "no-proto": "error",
        "no-return-assign": "error",
        "no-unmodified-loop-condition": "error",
        "no-useless-concat": "error",
        "require-await": "error",
        "no-shadow": [
          "error",
          {
            "builtinGlobals": false,
            "hoist": "all",
            "allow": [
              "err"
            ]
          }
        ],
        "no-undefined": "error",
        "no-use-before-define": "error",
        "global-require": "error",
        "handle-callback-err": "error",
        "no-mixed-requires": [
          "error",
          {
            "grouping": false,
            "allowCall": true
          }
        ],
        "array-bracket-newline": [
          "error",
          {
            "multiline": true
          }
        ],
        "camelcase": [
          2,
          {
            "properties": "always"
          }
        ],
        "brace-style": [
          "error",
          "1tbs",
          {
            "allowSingleLine": true
          }
        ],
        "comma-style": [
          "error",
          "last"
        ],
        "arrow-parens": [
          "error",
          "as-needed"
        ],
        "no-confusing-arrow": [
          "error",
          {
            "allowParens": true
          }
        ],
        "no-useless-rename": "error",
        "no-var": "error",
        "prefer-spread": "error",
        "prefer-template": "error",
        "template-curly-spacing": [
          "error",
          "never"
        ],
        "wrap-regex": "error",
        "template-tag-spacing": [
          "error",
          "always"
        ],
        "no-console": [
          "error",
          {
            "allow": [
              "warn",
              "error"
            ]
          }
        ],
        "eol-last": [
          "error",
          "always"
        ],
        "arrow-body-style": [
          "error",
          "as-needed"
        ],
        "constructor-super": "error",
        "no-const-assign": "error",
        "prefer-const": "error",
        "switch-colon-spacing": "error",
        "no-whitespace-before-property": "error",
        "no-inline-comments": "error",
        "new-parens": "error",
        "lines-between-class-members": [
          "error",
          "always"
        ],
        "no-redeclare": "error",
        "no-new": "error",
        "no-eq-null": "error",
        "block-scoped-var": "error",
        "no-extra-parens": "error",
        "no-empty": "error",
        "no-unreachable": "error",
        "spaced-comment": [
          "error",
          "always"
        ],
        "no-trailing-spaces": "error",
        "no-multiple-empty-lines": [
          "error",
          {
            "max": 1,
            "maxBOF": 0,
            "maxEOF": 1
          }
        ]
      }
    }
`;

  return eslint;
};

module.exports = makeEslint;
