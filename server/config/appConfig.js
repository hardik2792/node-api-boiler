/*
File: appConfig.js
App Name: API Demo
Purpose: Configuration Part for Server and Database
Created By: Hardik Thakor */

'use strict'
module.exports ={
  "db" :{           //Database Configuration
          "port"		: 27017,
          "dbName"	: 'meandemo',
          "authDb"	: 'admin',
          "url"		  : 'mongodb://127.0.0.1:27017/meandemo',
          "host"		: 'localhost',
          "user"		: "mean",
          "passkey"	: "$3cRE@t",
        },
  "server": {       //Server Configuration
          "name":"MEAN Boiler Demo",
          "port":4000,
          "considerPort":true
        },
  "email": {       //Server Configuration
          "accountName":"MEAN Boiler Demo",
          "port":4000,
          "considerPort":true
        }
}
