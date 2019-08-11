/**************************************
 *	Purpose: Mail Utilities           *
 **************************************/
const nodemailer = require('nodemailer');
const dateTimeUtils = require('./dateTime');
const Config = require('../config/appConfig');

// Email Configuration
let smtpTransport = nodemailer.createTransport({
    service: Config.email.accountName,
    auth: {
        user: Config.email.username,
        pass: Config.email.password
    },
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL
});

module.exports = {        // Exports
  send_mail,              //1. Sending Mail
  generateTokenAndMail    //2. Generate Token and Mail
}

/**
  * 1. Sending Mail
  * @param {string} mailData - Details about Mail.
  * @return {boolean} response - True/False.
*/
async function send_mail(mailData){
  try {
    let mailOptions = {
        from: '"API Demo"', // sender address
        subject: mailData.subject,
        to:  mailData.to, // list of receivers
        priority: 'high'
    };
    if(mailData.html) mailOptions.html =  mailData.html;
    if(mailData.text) mailOptions.text =  mailData.text;

    smtpTransport.sendMail(mailOptions, async(error, info) => {
      if (error) {
          console.log('mail sending error');
          console.log(error);
          return false;
      } else{
        console.log("\n\nVerification Mail Send for ", mailData.to);
        let expires_in = await dateTimeUtils.getCurrentDateTime('DD-MM-YYYY HH:mm:ss',true,'');
        expires_in = await dateTimeUtils.getCurrentDateTime('DD-MM-YYYY HH:mm:ss',true,'')
        expires_in = expires_in.toISOString();
        let responseData = {
            'expires_in': expires_in,
            'mytoken': mailData.mytoken
        };
        let updatedCompany = await Company.update({'email':  mailData.to},
            { $set: { expires_in: expires_in, token: mailData.mytoken}},
            { upsert: false,new: false});
        console.log(responseData);
        return responseData;
      }
    });
  } catch (e) {
    console.log("!mail:send_mail Error Sending Mail!");
    return false;
  }
}


/**
  * 2. Generating Token and Sending Mail
  * @param {object} user - Email Id to Send.
  * @param {string} subject - Subject of Mail.
*/
async function generateTokenAndMail(user, subject) {
  try {
    console.log("generateTokenAndMail");
    let verificationHtml;
    let verificationText;
    let mytoken = await randString(6);

    let mailData = { subject : subject, to : user.email, mytoken: mytoken };

    if (subject === 'Forgotten password request') {
        let url = Config.server_url + mytoken + '/change-password';
        verificationHtml = '<H2>Hi ' + user.firstname + ' ' + user.lastname + ',</H2><p>Manehub recently received a request for a forgotten password.</p> <br /> <p>To change your Manehub password, please click on this <a href=' + url + '>link</a>.</p><br /> <p>If you did not request this change, you do not need to do anything .</p> <br /> <p>This link will expire in 10 minutes.</p> <br /> Thanks, <br /> Manehub Support';
        verificationText = 'Hi ' + user.firstname + ' ' + user.lastname + ', Manehub recently received a request for a forgotten password. To change your Manehub password, please click on this ' + url + '. If you did not request this change, you do not need to do anything .This link will expire in 4 hours. Thanks, Manehub Support';

        mailData.html = verificationHtml;
        mailData.text = verificationText;
    } else if (subject === 'Confirm your account') {
        let url = Config.server_url + '#/verify/' + mytoken;
        verificationHtml =`<html>
                            <head>
                              <title>Confirmation mail</title>
                              <link href="https://fonts.googleapis.com/css?family=Roboto:400,700" rel="stylesheet">
                            </head>
                            <body style="font-family:'Roboto', sans-serif;">
                              <div><img src="http://manehubonline.com/img/564604370296484979.png" style="max-width:100%;height:auto;margin:0 auto" alt="Manehub Logo"></div>
                              <p>Hey Manehub user,</p>
                              <p>You are almost there! <a href="`+ url +`"> Click here</a> to verify your email address.</p>
                              <h6>Note: This Mail Link is expires in next 10 mins. </h6>
                            </body>
                          </html>`;
        mailData.html = verificationHtml;
    } else {
        let url = Config.server_url + mytoken + '/verify';
        verificationHtml = '<p>Congratulations!!! <a href=' + url + '>this link</a>. If you are unable to do so, copy and paste the following link into your browser:</p><p>' + url + '</p>';
        verificationText = 'Please verify your account by clicking the following link, or by copying and pasting it into your browser: ' + url;
        mailData.html = verificationHtml;
        mailData.text = verificationText;
    }

    let mailResponse = await send_mail(mailData);
    return mailResponse;
  } catch (e) {
    console.log("!mail:generateTokenAndMail Error Generating Mail!", e);
    return false;
  }
}

async function randString (x) {
    let s = '';
    while (s.length < x && x > 0) {
        let r = Math.random();
        s += (r < 0.1 ? Math.floor(r * 100) : String.fromCharCode(Math.floor(r * 26) + (r > 0.5 ? 97 : 65)));
    }
    return s;
}
