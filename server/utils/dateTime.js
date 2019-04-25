/************************************************************************
*	@fileOverview Date Time Utilities(BASED on MOMENTJS) For Nodejs       *
* @author <a href="mailto:hardikthakor2792@gmail.com">Hardik Thakor</a> *
* @version 0.0.2                                                        *
*************************************************************************/

/* Imports */
const Moment = require('moment');

module.exports = {
  getCurrentDateTime,     //1. Returns Current Date Time in required Format
  operateDateTime,        //2. Returns Date/Time after being addition/subtraction
  transformDate,          //3. Returns Value after converting to Specified Format
  transformDateToTimezone,//4. Return Value to Specified Time Zone
  timeDifference,         //5. Return Difference between Datetimes provided in specified format
  isStandardDateTime,     //6. Returns If Date is Valid or Invalid
  toMilliseconds,         //7. Returns Datetime to Milliseconds
  transformSeconds,       //8. Returns Provided Seconds to Specified Format
  compareDateTime         //9. Returns Boolean after comparing Type
}

/**
  * 1. Return Current DateTime
  * @param {string} format - Format to return.
  * @param {boolean} isUTC - If need UTC time or Server's local time.
  * @param {string} timeZone - Convert Date Time as per Time zone provided.
  * @returns {string}
*/
async function getCurrentDateTime(format, isUTC, timeZone) {
  if(!format) format = '';
  let resultDate = isUTC ? Moment().utc().format(format) : Moment().format(format);
  if(timeZone != '') resultDate = await transformDateToTimezone(resultDate, timeZone, format);
  return resultDate;
}

/**
  * 2. Return DateTime after addition or subtraction
  * @param {string} dateTime - DateTime/Date/Time.
  * @param {string} format - Format to return.
  * @param {string} operation - add/subtract.
  * @param {string} operateOn - year/month/day/hour/min.
  * @param {number} value - Value to increament/decreament.
  * @returns {string}
*/
async function operateDateTime(dateTime, format, operation, operateOn, value) {
  if(operation == 'add') return Moment(dateTime).add(operateOn, value).format(format);
  else return Moment(dateTime).subtract(operateOn, value).format(format);
}

/**
  * 3. Return Value after converting to Specified Format
  * @param {string} dateTime - DateTime/Date/Time.
  * @param {string} toFormat - Format to return.
  * @param {string} fromFormat - Transformation from format.
  * @returns {string}
*/
async function transformDate(dateTime, toFormat, fromFormat, isUTC) {
  if(!toFormat) toFormat = 'DD-MM-YYYY';
  if(!dateTime || dateTime=='') dateTime = await getCurrentDateTime('',false,'');
  return isUTC ? Moment(dateTime, fromFormat).utc().format(toFormat) : Moment(dateTime, fromFormat).format(toFormat);
}

/**
  * 4. Return Value to Specified Time Zone
  * @param {string} dateTime - DateTime/Date/Time.
  * @param {string} timezone - to transform date as per Time Zone provided.
  * @param {string} format - Format to return.
  * @returns {string}
*/
async function transformDateToTimezone(dateTime, timezone, format) {
  if(!timezone) timezone = 'Pacific/Auckland';
  return Moment(dateTime).tz(timezone).format(format);
}

/**
  * 5. Return Difference between Datetimes provided in specified format
  * @param {string} startDateTime - DateTime/Date/Time.
  * @param {string} endDateTime - DateTime/Date/Time.
  * @param {string} differenceType - years/months/weeks/days/hours/minutes/seconds.
  * @param {string} providedFormat - Format of startDateTime & endDateTime.
  * @returns {number}
*/
async function timeDifference(startDateTime, endDateTime, differenceType, providedFormat) {
  if(!differenceType) differenceType = 'days';
  return Moment(endDateTime,providedFormat).diff(Moment(startDateTime,providedFormat), differenceType);
}

/**
  * 6. Returns If Date is Valid or Invalid
  * @param {string} dateTime - DateTime/Date/Time.
  * @returns {boolean}
*/
async function isStandardDateTime(dateTime) {
  return Moment(dateTime).isValid();
}

/**
  * 7. Returns Datetime to Milliseconds
  * @param {string} dateTime - DateTime/Date/Time.
  * @returns {number}
*/
async function toMilliseconds(dateTime) {
  return dateTime.split(':').reverse().reduce((prev, curr, i) => prev + curr*Math.pow(60, i), 0);
}

/**
  * 8. Returns Provided Seconds to Specified Format
  * @param {string} seconds - Seconds.
  * @param {string} format - Format to return.
  * @returns {string}
*/
async function transformSeconds(seconds,format) {
  // let duration = Moment.duration(seconds, 'seconds');
  // return Moment.utc(duration.asMilliseconds()).format(format);
  var hours = Math.floor(seconds / 3600);
  seconds %= 3600;
  var minutes = Math.floor(seconds / 60);
  var seconds = seconds % 60;

  if(hours < 10) hours = '0'+hours;
  if(minutes < 10) minutes = '0'+minutes;
  return hours + ':' + minutes;
}

/**
  * 9. Returns Date isBefore/isAfter
  * @param {string} firstDate - Date to Compare.
  * @param {string} secondDate - Date to compare with.
  * @param {string} queryType - Comparison Type i.e. isBefore/isSame/isAfter/isSameOrBefore/isSameOrAfter.
  * @param {string} compareType - Comparison Type i.e. day/month/year.
  * @param {boolean} isSame - To include Second date in Equality.
  * @returns {boolean}
*/
async function compareDateTime(firstDate, secondDate, queryType, compareType, isSame) {
  if(queryType == 'isBefore')   return Moment(firstDate).isBefore(secondDate, compareType);
  else if(queryType == 'isSame') return Moment(firstDate).isSame(secondDate, compareType);
  else if(queryType == 'isAfter') return Moment(firstDate).isAfter(secondDate, compareType);
  else if(queryType == 'isSameOrBefore') return Moment(firstDate).isSameOrBefore(secondDate, compareType);
  else if(queryType == 'isSameOrAfter') return Moment(firstDate).isSameOrAfter(secondDate, compareType);
}

