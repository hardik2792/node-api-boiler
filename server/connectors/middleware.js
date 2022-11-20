const chalk 	= require('chalk');
const path = require('path');
const mongoose = require('mongoose');
const ip = require('ip');
const dbControls = require('../config/appConfig').db;

global.appRoot = path.resolve(__dirname);
global.appIP = ip.address();            //To Fetch IP of Server

module.exports = (app, express) => {

  // Connecting to Database
  const dbConnectURL = dbControls.url;
  const dbOptions = {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
  };
  mongoose.Promise = global.Promise;
  mongoose.connect(dbConnectURL, dbOptions).then(() => {
    console.log(chalk.blue('Connection to Database is '), chalk.green.bold("Successful!"));
  }).catch((error) => {
    console.log(chalk.red('Connection to Database '), chalk.red.bold("Failed!"), chalk.red('\n Due to', error));
  });

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(function (req, res, next) {        //Enable CORS
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  // override default msg
  app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
      return res.status(401).send({ error: 'Unauthorized' });
    }
  });
};