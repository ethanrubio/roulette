var Yelp = require('yelp');
var keys = require('../util/config');

var yelp = new Yelp({
  consumer_key: keys.yelp.consumer_key,
  consumer_secret: keys.yelp.consumer_secret,
  token: keys.yelp.token,
  token_secret: keys.yelp.token_secret,
});

module.exports = {
  search: function(req, res) {
    var lat = req.body.lat;
    var long = req.body.long;
    var latLongString = lat + ',' + long;

    yelp.search({ term: 'bar', ll: latLongString })
    .then(function(data) {
      // randomize which bar you get!
      var randomNumber = Math.floor(Math.random() * (20 - 0)) + 0;

      res.status(200).send(data.businesses[randomNumber]);
    })
    .catch(function(err) {
      console.error(err);
    });

  }

};
