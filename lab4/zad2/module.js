const fs = require('fs');

module.exports = function check(path){
    path = './' + path;
    try{
        if(fs.existsSync(path)){
            if(fs.statSync(path).isFile()){
                // console.log("File exists");
                // let data = fs.readFileSync(path, 'utf-8')
                // console.log("[File: `" + path + "` content]");
                // console.log(data);
            }
            else if(fs.statSync(path).isDirectory()){
                // console.log("Directory exist");
            }
            return true
        }else{
            // console.log("File/Directory do not exists in this folder");
            return false
        }
    }catch(err){
        console.error(err);
    }
}

