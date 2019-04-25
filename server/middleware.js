const bodyParser   = require('body-parser');
const path         = require('path');
const ip           = require('ip');

global.appRoot     = path.resolve(__dirname);
global.appIP       = ip.address();            //To Fetch IP of Server

module.exports = (app) => {

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(function(req, res, next) {        //Enable CORS
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  // override default msg
  app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
      return res.status(401).send({error: 'Unauthorized'});
    }
  });
};