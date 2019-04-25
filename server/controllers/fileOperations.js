/*
File: controller.js
App Name: API Demo
Purpose: Provides Function/Control For Files
Created By: Hardik Thakor */

'use strict';
const chalk = require('chalk');                   //For Displaying Logs in different Colors
const Excel = require('exceljs');
const fs    = require('fs');

const mongoose = require('mongoose');             //For Mongodb Schema
const Todo = mongoose.model('Todo');

const server 	= require('../config/appConfig').server;

const dateTimeUtils    = require('../utils/dateTime');
const errorLoggerUtils = require('../utils/errorLogger');

//1. For Generating File
async function generatingFile(req,res){
	let fileData;
	if(req.query.type == 'spreadSheet'){
		fileData = await generatingSpreadSheet('spreadSheet');
	} else{
		fileData = await generatingSpreadSheet('csv');
	}
	res.json({"success":true,"data":'http://'+appIP+':'+appPort+fileData.path});
}

async function generatingSpreadSheet(type){
	try{
        console.log(chalk.green("Generating Spreadsheet"));
        let excelConfig ={
            xColFrozen : 1,
            yColFrozen : 1,
            activeCell : 'B2',
            viewCell : 'B2',
            initDataCol : 'A'
        };
        let bgRowColor = 'FFF5DEB3';
        let headerFont = {
                name: 'Arial',
                family: 2,
                color:'FFFFFFFF',
                size: 12,
                bold: true
            };
        let footerFont = {
               name: 'Comic Sans MS',
               family: 4,
               size: 16,
               bold: true
            };
        let footerFill = {
            type: 'pattern',
            pattern:'darkVertical',
            fgColor:{argb:'80FF0000'}
        };
        let headerAlign = { vertical: 'middle', horizontal: 'center' };
        let workbook = new Excel.Workbook();

        if(!fs.existsSync('./server/generatedFiles')) {
          fs.mkdirSync('./server/generatedFiles', parseInt('0744',8));
        }

        workbook.creator = "MEAN Demo";
        workbook.lastModifiedBy = "MEAN Demo";
        workbook.created = new Date();
        workbook.modified = new Date();
        let filename = 'todo_'+ await dateTimeUtils.getCurrentDateTime('YYYYMMDDhhmmss',true,'') +'.xlsx';
        let csvfilename = 'todo_'+ await dateTimeUtils.getCurrentDateTime('YYYYMMDDhhmmss',true,'') +'.csv';
        let sheetName = 'ToDos';

        let filePath = './server/generatedFiles/'+filename;
        let csvFilePath = './server/generatedFiles/'+csvfilename;
        let sheet = workbook.addWorksheet(sheetName, {
                        views:[{
                            state: 'frozen',
                            xSplit: excelConfig.xColFrozen,
                            ySplit: excelConfig.yColFrozen,
                            topLeftCell: excelConfig.viewCell,
                            activeCell: excelConfig.activeCell
                        }],
                        pageSetup:{paperSize: 9, orientation:'landscape'}
                    });
        let colArray = [];
        colArray = [
            { header: 'No', key: 'no', width: 7 },
            { header: 'Details', key: 'details', width: 25 },
            { header: 'Priority', key: 'priority', width: 15 },
            { header: 'Status', key: 'status', width: 15 },
            { header: 'Created At', key: 'createdDate', width: 15 },
            { header: 'Modified At', key: 'modifiedDate', width: 15 }
        ];

        let rowStyle = {
                        type: 'pattern',
                        pattern:'solid',
                        fgColor:{argb:bgRowColor}
                    };
        let colChar = excelConfig.initDataCol;
        sheet.columns = colArray;
        sheet.getRow(1).alignment = headerAlign;
        sheet.getRow(1).fill = rowStyle;
        sheet.getRow(1).font = headerFont;

        let tempIter = 0;
        let todoDetails = await Todo.find({});
        for (let iter = 0; iter < todoDetails.length; iter++) {
            sheet.getCell('A'+(tempIter+2)).value = (iter+1);
            sheet.getCell('B'+(tempIter+2)).value = todoDetails[iter].details;
            sheet.getCell('C'+(tempIter+2)).value = todoDetails[iter].priority;
            sheet.getCell('D'+(tempIter+2)).value = todoDetails[iter].isCompleted ? 'Completed' : 'Incomplete';
            sheet.getCell('E'+(tempIter+2)).value = todoDetails[iter].createdDate;
            sheet.getCell('F'+(tempIter+2)).value = todoDetails[iter].modifiedDate;
            tempIter++;
        }
        sheet.getColumn('E').alignment = headerAlign;
        sheet.getColumn('F').alignment = headerAlign;

        if(type ==  'spreadSheet'){
            tempIter += 5;
            sheet.mergeCells('B'+(tempIter+5), 'F'+(tempIter+5));
            sheet.getCell('B'+(tempIter+5)).value = 'Generated at '+ await dateTimeUtils.getCurrentDateTime('DD-MM-YYYY HH:mm:ss',true,'');
            sheet.getCell('B'+(tempIter+5)).alignment = headerAlign;
            sheet.getCell('B'+(tempIter+5)).font = footerFont;
            sheet.getCell('B'+(tempIter+5)).fill = footerFill;
            await workbook.xlsx.writeFile(filePath)   //To Create WorkBook/Excel File
                .then(function() {
                    console.log(chalk.blue.bold("#Spreadsheet with path "+ appIP+(server.considerPort?':'+appPort:'')+"/files/" + filename+ " has been created..."));
                });
            return ({"success":true,"name": filename,"path": "/files/" + filename});
        }

        else if(type ==  'csv'){
            await workbook.csv.writeFile(csvFilePath)
                .then(function() {
                    console.log(chalk.blue.bold("#CSV with path "+ appIP+(server.considerPort?':'+appPort:'')+"/files/"+csvfilename+" has been created..."));
                });
            return ({"success":true,"name": filename,"path": "/files/" + csvfilename});
        }
    } catch(err){
        return ({"success": false});
    }
}

async function generatingCSV(){

}
module.exports = {
	generatingFile,				//1
    generatingSpreadSheet,      //1.1
    generatingCSV	      		//1.2
};