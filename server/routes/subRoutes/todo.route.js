/*
File: index.js
App Name: API Demo
Purpose: Routing For API Call
Created By: Hardik Thakor */

const chalk 	= require('chalk');

const control 	= require('../../controllers/controller');

module.exports = function (app,express) {
    const router = express.Router();
    //Test API
	router.get("/testConnection", function(req,res) {
		res.send({'success':true,'message':'Successfully Connected!'})
	});

	router.post("/create", control.addtodo);
	router.get("/get", control.gettodo);
	router.put("/update/:id", control.updatetodo);
	router.delete("/delete/:id", control.deletetodo);

    app.use("/todo", router);
}
