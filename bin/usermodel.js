var log = require('tracer').console({format: "{{message}}  - {{file}}:{{line}}"}).log;
var chalk = require('chalk');
var co = require('co');
var prompt = require('co-prompt');
var mkdirp = require('mkdirp');
var program = require('commander');
var fs = require('fs');

var readlineSync = require('readline-sync');

var defaultfile={
   
  
        makefile:function makedefaultFile(appname,dir, fileName, fileData) {
            //console.log(dir);

           
       
        if (fs.existsSync(''+appname+'/features',function (err) {
            if (err) {
                log("Error No Feature directory found");
            }
        }))
         {
            
                    mkdirp(''+appname+'/features/' + dir, function (err) {
                        if (err) {
                            log("No Feature directory found");
                        }
                    });
                }
                else
                    log('Feature directory not exist! \n Either you are not in correct directory.')
            
            
            
            fs.writeFile(''+appname+'/features/' + dir + "/" + fileName + ".js", fileData, function (err) {
                if (err) {
                    log("The path " + err.path + " not found.");
                    return;
                }
                log("./features/" + dir + "/" + fileName + ".js" + " created");
        
            });
            
        }
}
module.exports=defaultfile;