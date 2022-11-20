/************************************
	Server File
	App Name: API Demo
	Purpose: Server Initialization
*************************************/

// Imports
const express 	= require('express');
const http 		= require('http');
const path 		= require('path');
const chalk 	= require('chalk'); //For Displaying Logs in different Colors
const fs 		= require('fs');
const ip        = require('ip');
const serverCfg	= require('./server/config/appConfig').server;
const models    = path.join(__dirname, './server/models');         //Fetching All Models

const app = express();

// Setting Application PORT
app.set('port', process.env.PORT || serverCfg.port);

// Middlewares setup
require('./server/connectors/middleware')(app, express);

//For Listing All the Models
fs.readdirSync(models)
  .filter(file => ~file.search(/^[^\.].*\.js$/))
  .forEach(file => require(path.join(models, file)));

// Default Application Path
app.use(express.static(path.join(__dirname, 'public')));
app.use("/files", express.static(__dirname + '/server/generatedFiles'));

// Application Routes
require('./server/routes/index.js')(app, express);

global.appPort    = app.get('port');

const server = app.listen(appPort, () => {
    console.log(chalk.green.bold(serverCfg.name),chalk.blue('started @ IP'),chalk.green.bold('`http://'+ip.address()+':'+app.get('port')+'`'));
});

// Real-time Communication
  require('./server/connectors/socket')(server);