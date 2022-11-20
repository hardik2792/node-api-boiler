/*
File: index.js
App Name: API Demo
Purpose: Routing For API Call
Created By: Hardik Thakor */
const foCtrls 	= require('../../controllers/fileOperations');
const cmdCtrls 	= require('../../controllers/cmdController');

module.exports = function (app,express) {
    const router = express.Router();
	router.get("/generate/:type", foCtrls.generatingFile);

	router.get("/compressFolder", cmdCtrls.compressFolder);
    app.use("/file", router);
}
