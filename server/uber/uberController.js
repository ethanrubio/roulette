var Q = require('q');
var Uber = require('node-uber');
var keys = require('../util/config.js');

var options = {
  sandbox: true,
  client_id: keys.uber.client_id,
  client_secret: keys.uber.client_secret,
  server_token: keys.uber.server_token,
  redirect_uri: 'http://localhost:3000/api/uber/callback'
};

var uber = new Uber(options);

module.exports = {
  estimate: function(req, res, next) {
    var startLat = req.body.startLat;
    var startLong = req.body.startLong;
    var endLat = req.body.endLat;
    var endLong = req.body.endLong;

   uber.estimates.price({
      start_latitude: startLat,
      start_longitude: startLong,
      end_latitude: endLat,
      end_longitude: endLong
    }, function(error, response) {
     if (error) {
       console.error(error);
     } else {
       console.log(response);
       res.status(200).send(response);
     }
   });
  },

  authenticate: function(req, res) {
    var scope = ['request'];
    res.redirect(uber.getAuthorizeUrl(scope, 'http://localhost:3000/api/uber/callback?product_id=' + req.query.product_id
      + '&start_latitude=' + req.query.start_latitude + '&start_longitude=' + req.query.start_longitude
      + '$end_longitude=' + req.query.end_longitude + '&end_latitude=' + req.query.end_longitude));
  },

  token: function(req, res) {
    uber.authorization({grantType: 'authorization_code', authorization_code: req.query.code}, function (err, access_token) {

      // token expires in 30 days -> store in future DB
      uber.access_token = access_token;
      res.send('Got an access token! Head to /book to initiate an ride request.');
    });
  }

};
