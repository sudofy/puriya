let model = {

  defaultmodel: function () {
    const dmodel = `const mongoose = require('mongoose');

        const Schema = mongoose.Schema;
        
        const passportLocalMongoose = require('passport-local-mongoose');
        
        const User = new Schema({
        
          username: String,
          password: String,
          OauthId: String,
          OauthToken: String,
          firstname: {
            type: String,
            default: ''
          },
          lastname: {
            type: String,
            default: ''
          },
          admin: {
            type: Boolean,
            default: false
          },
          resetToken: {
            type: String,
            default: ''
          }
        
        }
        
        );
        User.plugin(passportLocalMongoose);
        
        module.exports = mongoose.model(\`User\`, User);
        
    `;
    return dmodel;
  },
  addNewModal: function (name, modelData) {

    model = `
    var log = require('tracer').console({format: "{{message}}  - {{file}}:{{line}}"}).log;\n
    var mongoose = require('mongoose');\n
    var Schema = mongoose.Schema;\n
    var passportLocalMongoose = require('passport-local-mongoose');\n
    
    var ${name} = new Schema({\n
    
    `;

    for (const data in modelData) {
      model += `${modelData[data].name}  : `;
      model += modelData[data].type;
      model += `,\n`;
    }

    model += `});\n
    
    module.exports = mongoose.model(${name}, ${name});\n`;

    return model;
  }
};

module.exports = model;
