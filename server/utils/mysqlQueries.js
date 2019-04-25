/**************************************
 *	Purpose: MySQL Query Utilities    *
 **************************************/
 const errorLoggerUtils = require('./errorLogger');

 module.exports = {
   selectRecords,     //1. Getting Records/Data
   updateRecords,     //2. Updating Existing Records/Data
   insertRecords,     //3. Insert Records/Data
 }

 /**
   * 1. Return Selected Records
   * @param {string} fields - Fields to Select from Provided Table.
   * @param {string} tableName - Name of the Table.
   * @param {string} whereClause - Filter Records.
   * @returns {array}
 */
 async function selectRecords(fields, tableName, whereClause) {
   try {
     let selectQuery = 'SELECT '+fields+' FROM '+tableName;
     if(whereClause !='' && whereClause) selectQuery = selectQuery+' WHERE '+whereClause;
     let selectedData = await dbPool.query(selectQuery);
     return {'success':true,'data':selectedData};
   } catch (e) {
     console.log("Error Fetching Record!");
     errorManagerUtils.updateErrorLogs("Error Fetching Record! \n"+e, '');
     return {'success':false,'msg':'Error Fetching Record!'};
   }
 }

 /**
   * 2. Return Boolean for Updated Fields
   * @param {string} fields - Fields to Select from Provided Table.
   * @param {string} tableName - Name of the Table.
   * @param {string} whereClause - Filter Records.
 */
 async function updateRecords(tableName, toUpdateFields, whereClause) {
   try{
     let updateQuery = 'UPDATE '+tableName+' SET '+toUpdateFields;
     if(whereClause !='' && whereClause) updateQuery = updateQuery+' WHERE '+whereClause;
     let updatedData = await dbPool.query(updateQuery);
     return {'success':true,'data':updatedData};
   } catch (e) {
     errorManagerUtils.updateErrorLogs("Error Updating Record! \n"+e, '');
     return {'success':false,'msg':'Error Updating Record!'};
   }
 }

 /**
   * 3. Return Boolean for Updated Fields
   * @param {string} fields - Fields to Select from Provided Table.
   * @param {string} tableName - Name of the Table.
   * @param {string} values - Values to be Inserted
 */
 async function insertRecords(tableName, fields, values) {
   try {
     let insertQuery = 'INSERT INTO '+tableName+' ('+fields+') VALUES ('+values+')';
     console.log("insertQuery =",insertQuery);
     let insertedData = await dbPool.query(insertQuery);
     return {'success':true,'data':insertedData};
   } catch (e) {
     errorManagerUtils.updateErrorLogs("Error Inserting Record! \n"+e, '');
     return {'success':false,'msg':'Error Inserting Record!'};
   }
 }
