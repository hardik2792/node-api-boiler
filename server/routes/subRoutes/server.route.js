/*
File: index.js
App Name: API Demo
Purpose: Routing For API Call
Created By: Hardik Thakor */

const chalk = require('chalk');

module.exports = function (app, express) {
	const router = express.Router();
	//Test API
	router.get("/testConnection", function (req, res) {
		console.log(chalk.bgBlue("\nServer Working!"));
		res.send({ 'success': true, 'message': 'Successfully Connected!' })
	});

	app.use("/", router);
}
