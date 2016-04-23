var Q = require('q');
var Uber = require('node-uber');
var keys = require('../util/config.js');

var uber = new Uber({
  client_id: keys.uber.client_id,
  client_secret: keys.uber.client_secret,
  server_token: keys.uber.server_token,
  redirect_uri: 'https://login.uber.com',
  name: 'BAR_ROULETTE'
});

module.exports = {
  estimate: function (req, res, next) {
    var startLat = req.body.startLat;
    var startLong = req.body.startLong;
    var endLat = req.body.endLat;
    var endLong = req.body.endLong;

   uber.estimates.price({
     start_latitude: startLat,
     start_longitude: startLong,
     end_latitude: endLat,
     end_longitude: endLong }, function (error, response) {
     if (error) {
       console.error(error);
     } else {
       console.log(response);
       res.status(200).send(response);
     }
   });
   
  }

};
