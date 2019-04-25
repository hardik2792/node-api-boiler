/*
Server File
App Name: API Demo
Purpose: Server Init File
Created By: Hardik Thakor
*/

// Imports
const express 	= require('express');
const http 		= require('http');
const path 		= require('path');
const chalk 	= require('chalk'); //For Displaying Logs in different Colors
const fs 		= require('fs');
const ip        = require('ip');
const server 	= require('./server/config/appConfig').server;
const models    = path.join(__dirname, './server/models');         //Fetching All Models

const app = express();

// Setting Application PORT
app.set('port', process.env.PORT || server.port);

// Middlewares setup
require('./server/middleware')(app);

//For Listing All the Models
fs.readdirSync(models)
  .filter(file => ~file.search(/^[^\.].*\.js$/))
  .forEach(file => require(path.join(models, file)));

// Default Application Path
app.use(express.static(path.join(__dirname, 'public')));
app.use("/files", express.static(__dirname + '/server/generatedFiles'));

// Application Routes
require('./server/routes/index.js')(app);

global.appPort    = app.get('port');

// Starting Server...
http.createServer(app).listen(app.get('port'), '0.0.0.0', function() {
    console.log(chalk.green.bold(server.name),chalk.blue('started @ IP'),chalk.green.bold('`http://'+ip.address()+':'+app.get('port')+'`'));
});
