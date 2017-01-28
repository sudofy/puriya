var config = '';

var makeConfig = function (secretKey, serialPass,mongoUrl) {

    config = `module.exports = {
                      secretKey: '` + secretKey + `' ,
                      mongoUrl: '` + mongoUrl + `',
                      sealPass: '` + serialPass + `' ,
                      facebook: {
                        secret: '',
                        accessTokenUrl: '',
                        graphApiUrl: ''
                      },
                      s3: {
                        accessKeyId: '',
                        secretAccessKey: '',
                        region: 'eu-west-1'
                      },
                      mailgun: {
                        'apiKey': '',
                        'domain': ''
                      }
              };`;

    return config;

};

module.exports = makeConfig;