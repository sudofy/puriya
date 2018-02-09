let codes = '';
const makeCodes = function () {
  codes = ` module.exports = {
    FOUND: 200,
    NOT_FOUND: 404,
    DB_ERROR: 500,
    SERVER_ERROR: 500,
    BAD_REQUEST: 500,
    AUTH_ERROR: 401
  };
  
` ;

  return codes;

};

module.exports = makeCodes;

/**
 * Created by hii on 03/01/2017.
 */
