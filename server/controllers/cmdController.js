const fs = require('fs');
const exec = require('child_process').exec;
const chalk = require('chalk');                   //For Displaying Logs in different Colors

const db = require('../config/appConfig').db;

const dateTimeUtils = require('../utils/dateTime');
const mailMngrUtils = require('../utils/mailManager');

async function dbBackUp(req, res) {
  console.log(chalk.bold.red("#Starting Backup...."));
  try{
    let cmd = 'mongodump --host ' + db.host + ' --port ' + db.port + ' --db ' + db.dbName + ' --username ' + db.user + ' --password ' + db.passkey + ' --out ' + __dirname; // Command for mongodb dump process
    exec(cmd, async function (error, stdout, stderr) {
      if (!error) {
        console.log("Database Successfully Dumped!")
        let date = await dateTimeUtils.getCurrentDateTime('YYYYMMDD',true,''); //moment(new Date()).format('DDMMYYYY');
        let fileName = "todoDb_"+date+".zip";
        cmd = "zip -r "+fileName+" ./server/controllers/todoDb";
        exec(cmd, function (error, stdout, stderr) {
          if (!error) {
            console.log("Compressed DB Folder!");
            res.status(200).send({"status":"Success","message":"Database Successfully Dumped!","path": appRoot+"/server/controllers/todoDb"});
          }
        });
      }
    });
  }
  catch (err){
    res.status(500).send(err);
  }
};


async function compressFolder(req, res) {
  try{
    let cmd = "cd server && zip -r genFiles.zip generatedFiles";
    exec(cmd, function (error, stdout, stderr) {
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
  dbBackUp,
  compressFolder
}