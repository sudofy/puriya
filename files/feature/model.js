
var model = {

    defaultmodel: function () {
        var dmodel = `
    var log = require('tracer').console({format: "{{message}}  - {{file}}:{{line}}"}).log;\n
    var mongoose = require('mongoose');\n
    var Schema = mongoose.Schema;\n
    var passportLocalMongoose = require('passport-local-mongoose');\n
    
    var User = new Schema({\n
        username: String,\n
        password: String,\n
        OauthId: String,\n
        OauthToken: String,\n
        firstname: {\n
          type: String,\n
          default: ''\n
        },\n
        lastname: {\n
          type: String,\n
          default: ''\n
        },
        admin: {\n
          type: Boolean,\n
          default: false\n
        },\n
        resetToken: {\n
          type: String,\n
          default: ''\n
        }\n
    }\n
);
    User.plugin(passportLocalMongoose);\n
    module.exports = mongoose.model('user',User);
    `
        return dmodel;
    }
    ,
    addNewModal: function (name, modelData) {

        model = `
    var log = require('tracer').console({format: "{{message}}  - {{file}}:{{line}}"}).log;\n
    var mongoose = require('mongoose');\n
    var Schema = mongoose.Schema;\n
    var passportLocalMongoose = require('passport-local-mongoose');\n
    
    var ` + name + ` = new Schema({\n
    
    `;

        for (var data in modelData) {
            model += modelData[data].name + " : ";
            model += modelData[data].type;
            model += `,\n`;
        }

        model += `});\n
    
    module.exports = mongoose.model('` + name + `', ` + name + `);\n`;


        return model;
    }
};

module.exports = model;