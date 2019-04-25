const fs = require('fs');
const _ = require('lodash');
const moment  = require('moment');
const exec = require('child_process').exec;
const db = require('../config/appConfig').db;
const chalk = require('chalk');                   //For Displaying Logs in different Colors

async function dbBackUp() {
    console.log(chalk.bold.red("#Starting Backup...."));
    try{
        let cmd = 'mongodump --host ' + db.host + ' --port ' + db.port + ' --db ' + db.dbName + ' --username ' + db.user + ' --password ' + db.passkey + ' --out ' + __dirname; // Command for mongodb dump process
        exec(cmd, function (error, stdout, stderr) {
            if (!error) {
                console.log("Database Successfully Dumped!")
                let date = moment(new Date()).format('DDMMYYYY');
                let fileName = "venus"+date+".zip";
                cmd = "zip -r "+fileName+" ./server/controllers/venus";
                exec(cmd, function (error, stdout, stderr) {
                    if (!error) {
                        console.log("Compressed DB Folder!");
                        res.status(200).send({"status":"Success","message":"Database Successfully Dumped!"});
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