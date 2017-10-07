var config = '';

var makeConfig = function (secretKey, serialPass, mongoUrl) {
  let secKey = secretKey || '864a6s8d^&%*%$&aASU((*&uih';
  let serpass = serialPass || '84a98sd4*&&%%*(%^*%^&asdas{}>894a*(*$@@8adYG&^&ASFDasd89dad';

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