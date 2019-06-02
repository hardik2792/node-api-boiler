/*
File: index.js
App Name: API Demo
Purpose: Routing For API Call
Created By: Hardik Thakor */

const mongoose  = require('mongoose');
mongoose.set('useFindAndModify', false);
const chalk 	= require('chalk');
const dbControls= require('../config/appConfig').db;

const control 	= require('../controllers/controller');
const foCtrls 	= require('../controllers/fileOperations');
const cmdCtrls 	= require('../controllers/cmdController');

// Connecting to Database
const dbConnectURL = dbControls.url;
const dbOptions = {
					useNewUrlParser: true,
                    keepAlive: 300000,
                    poolSize: 2,
                    promiseLibrary: global.Promise,
                };
mongoose.Promise = global.Promise;
mongoose.connect(dbConnectURL,dbOptions).then(() => {
        console.log(chalk.blue('Connection to Database is '),chalk.green.bold("Successful!"));
    }) .catch((error) => {
        console.log(chalk.red('Connection to Database '),chalk.red.bold("Failed!"),chalk.red('\n Due to' ,error));
    });

module.exports=function(app) {
	//Test API
	app.get("/testConnection", function(req,res) {
		res.send({'success':true,'message':'Successfully Connected!'})
	});

	app.post("/addtodo", control.addtodo);
	app.get("/gettodo", control.gettodo);
	app.put("/updatetodo", control.updatetodo);
	app.delete("/deletetodo/:id", control.deletetodo);

	app.get("/generatingFile", foCtrls.generatingFile);

	app.get("/dbBackUp", cmdCtrls.dbBackUp);
	app.get("/compressFolder", cmdCtrls.compressFolder);
};