var Q    = require('q'),
    Uber = require('node-uber'),
    keys = require('../util/config.js');

    var uber = new Uber({
      client_id: keys.uber.client_id,
      client_secret: keys.uber.client_secret,
      server_token: keys.uber.server_token,
      redirect_uri: 'REDIRECT URL',
      name: 'BAR_ROULETTE'
    });

module.exports = {
  estimate: function (req, res, next) {
    var startLat = req.body.startLat,
        startLong = req.body.startLong,
        endLat = req.body.endLat,
        endLong = req.body.endLong;

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

    console.log("i'm in the uber controller - startLat: ", startLat);
    console.log("i'm in the uber controller - startLong: ", startLong);
  }

};
