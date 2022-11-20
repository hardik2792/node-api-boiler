
const exec = require('child-process-promise').exec;

async function compressFolder(req, res) {
  try{
    let cmd = "cd server && zip -r genFiles.zip generatedFiles";
    exec(cmd, async (error, stdout, stderr) =>{
      if (!error) {
        console.log("Compressed Folder!");
        res.status(200).send({"status":"Success","message":"Folder Successfully Compressed!"});
      } else{
        console.log("Error Compressing Folder...!",error);
        res.status(500).send({"status":"error","message":"Error Compressing Folder!"});
      }
    });
  }
  catch (err){
    console.log("#compressFolder Error...!",err);
    res.status(500).send(err);
  }
}


// Exports
module.exports = {
  compressFolder
}