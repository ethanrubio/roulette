var Q    = require('q'),
    Yelp = require('yelp'),
    keys = require('../util/config.js');

var yelp = new Yelp({
  consumer_key: keys.yelp.consumer_key,
  consumer_secret: keys.yelp.consumer_secret,
  token: keys.yelp.token,
  token_secret: keys.yelp.token_secret,
});

module.exports = {
  search: function (req, res, next) {
    var lat = req.body.lat,
        long = req.body.long;

   var latLongString = lat + ',' + long;

   console.log(latLongString);

    yelp.search({ term: 'bar', ll: latLongString })
    .then(function (data) {
      // randomize which bar you get!
      var randomNumber = Math.floor(Math.random() * (20 - 0)) + 0;
      /*console.log(data.businesses[0].location);*/
      res.status(200).send(data.businesses[randomNumber]);

      // sample JSON from YELP !!!
      /*{ region:
   { span:
      { latitude_delta: 0.03161762999999951,
        longitude_delta: 0.04567019456558796 },
     center: { latitude: 34.01382135, longitude: -118.48086597934801 } },
  total: 1082,
  businesses: [ { is_claimed: true,
    rating: 4,
    mobile_url: 'http://m.yelp.com/biz/the-misfit-restaurant-bar-santa-monica?utm_campaign=yelp_api&utm_medium=api_v2_search&utm_source=95eZS34IPxiGl7KNoJlj_A',
    rating_img_url: 'http://s3-media4.fl.yelpcdn.com/assets/2/www/img/c2f3dd9799a5/ico/stars/v1/stars_4.png',
    review_count: 2349,
    name: 'The Misfit Restaurant + Bar',
    snippet_image_url: 'http://s3-media3.fl.yelpcdn.com/photo/h4vtJRUOWE0XeOGLnVuC0A/ms.jpg',
    rating_img_url_small: 'http://s3-media4.fl.yelpcdn.com/assets/2/www/img/f62a5be2f902/ico/stars/v1/stars_small_4.png',
    url: 'http://www.yelp.com/biz/the-misfit-restaurant-bar-santa-monica?utm_campaign=yelp_api&utm_medium=api_v2_search&utm_source=95eZS34IPxiGl7KNoJlj_A',
    categories: [Object],
    menu_date_updated: 1426629117,
    phone: '3106569800',
    snippet_text: 'This is a long overdue review as I\'ve been coming here for a while!\nDelicious food and fabulous service! It\'s hard to make up my mind when placing an...',
    image_url: 'http://s3-media4.fl.yelpcdn.com/bphoto/Dvb6PZA56JLYRA-SNl5Ivw/ms.jpg',
    location: [Object],
    display_phone: '+1-310-656-9800',
    rating_img_url_large: 'http://s3-media2.fl.yelpcdn.com/assets/2/www/img/ccf2b76faa2c/ico/stars/v1/stars_large_4.png',
    menu_provider: 'yelp',
    id: 'the-misfit-restaurant-bar-santa-monica',
    is_closed: false,
    distance: 478.5760194036798 }]
    }*/
    /* data.businesses[0].location
    { city: 'Santa Monica',
  display_address:
   [ '225 Santa Monica Blvd',
     'Santa Monica',
     'Santa Monica, CA 90401' ],
  geo_accuracy: 9.5,
  neighborhoods: [ 'Santa Monica' ],
  postal_code: '90401',
  country_code: 'US',
  address: [ '225 Santa Monica Blvd' ],
  coordinate: { latitude: 34.015401, longitude: -118.496658 },
  state_code: 'CA' }*/

    })
    .catch(function (err) {
      console.error(err);
    });

    console.log("i'm in the yelp controller - lat: ", lat);
    console.log("i'm in the yelp controller - long: ", long);
  }

};
