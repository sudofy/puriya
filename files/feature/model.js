var model = '';

var addNewModal = function (name, modelData) {

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
    
};

module.exports = addNewModal;