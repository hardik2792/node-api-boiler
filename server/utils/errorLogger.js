/*******************************************************
 *	Purpose: Logging Error During Application          *
 *******************************************************/
const fs = require('fs');

const dateTimeUtils = require('./dateTime');

module.exports = {
  updateErrorLogs     //1. Updating/Logging Error
}

let logPath = appRoot + '/server/errorLogs.txt'

if (!fs.existsSync('./server')) {
  fs.mkdirSync('./server', 0744);
}

/**
  * 1. Return Selected Records
  * @param {string} fields - Fields to Select from Provided Table.
  * @param {string} tableName - Name of the Table.
  * @param {string} whereClause - Filter Records.
  * @returns {array}
*/
async function updateErrorLogs(error, type) {
  try {
    error = '\n\nServer uncaughtException @' + await dateTimeUtils.getCurrentDateTime('YYYY-MM-DD HH:mm:ss',true,'') + ':' +error
    fs.appendFile(logPath, error, function(err) {
      if (err) console.log(err);
      console.log(`Exception Saved in ${logPath}`);
    });
    return {'success':true};
  } catch (e) {
    console.log('Error Updating: ',e);
    return {'success':false,'msg':'Error Logging!'};
  }
}
