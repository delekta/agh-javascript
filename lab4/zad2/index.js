const fs = require('fs');

const word = process.argv[2];

const path = './' + word;

// try{
    if(fs.existsSync(path)){
        if(fs.statSync(path).isFile()){
            console.log("File exists");
            let data = fs.readFileSync(path, 'utf-8')
            console.log("[File: `" + path + "` content]");
            console.log(data);
        }
        else if(fs.statSync(path).isDirectory()){
            console.log("Directory exist");
        }
    }else{
        console.log("File/Directory do not exists in this folder");
    }
// }catch(err){
//     console.error(err);
// }
