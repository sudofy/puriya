let config = '';

const makeConfig = function (secretKey, serialPass, mongoUrl) {
  const secKey = secretKey || `\`864a6s8d^&%*%$&aASU((*&uih\``;
  const serpass = serialPass || `\`84a98sd4*&&%%*(%^*%^&asdas{}>894a*(*$@@8adYG&^&ASFDasd89dad\``;

  config = `module.exports = {
                      secretKey: ${secKey} ,
                      mongoUrl: \`mongodb://localhost:27017/test\`,
                      sealPass: ${serpass},
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
