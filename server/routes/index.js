/*
File: index.js
App Name: API Demo
Purpose: Routing For API Call
Created By: Hardik Thakor */

const chalk = require('chalk');
const path = require('path');
const glob = require('glob');

module.exports = function (app, express) {
	const routePath = path.normalize(__dirname + '/**/*.route.js');
	glob(routePath, {}, (err, files) => {
		files.map((file) => {
			require(file)(app, express);
		})
	});

	console.log(chalk.bold("\nRouter Loaded!\n"));
}
