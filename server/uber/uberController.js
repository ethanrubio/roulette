var Q = require('q');
var Uber = require('node-uber');
var keys = require('../util/config.js');

var options = {
  sandbox: true,
  client_id: keys.uber.client_id,
  client_secret: keys.uber.client_secret,
  server_token: keys.uber.server_token,
  redirect_uri: 'http://localhost:3468/api/uber/callback'
};

var uber = new Uber(options);

module.exports = {
  estimate: function(req, res) {
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
    var scope = ['profile'];
    res.redirect(uber.getAuthorizeUrl(scope, 'http://localhost:3468/api/uber/callback?product_id=' + req.query.product_id
      + '&start_latitude=' + req.query.start_latitude + '&start_longitude=' + req.query.start_longitude
      + '&end_longitude=' + req.query.end_longitude + '&end_latitude=' + req.query.end_latitude));
  },

  getToken: function(req, res) {
    uber.authorization({grantType: 'authorization_code', authorization_code: req.query.code}, function(err, access_token) {
      
      console.log(access_token);

      var requestRide = {
        product_id: req.query.product_id,
        start_latitude: req.query.start_latitude,
        start_longitude: req.query.start_longitude,
        end_latitude: req.query.end_latitude,
        end_longitude: req.query.end_longitude
      };

      // token expires in 30 days -> store in future DB
      var token = access_token;
      module.exports.getProfile(token, res);
      // module.exports.requestRide(requestRide, token, res);
    });

  },
  
  getProfile: function(token, res) {
    if (!token || token === '') {
      res.status(401);
    } else {
      uber.user.profile(token, function(err, result) {
        if (err) {
          console.error(err);
          res.status(400);
        }
        console.log(result);
      });
    }
  },

  requestRide: function(req, res) {
    var requestRide = {
      product_id: req.body.product_id,
      start_latitude: req.body.start_latitude,
      start_longitude: req.body.start_longitude,
      end_latitude: req.body.end_latitude,
      end_longitude: req.body.end_longitude
    };    
    var requestUber = new Uber(options);
    
    requestUber.access_token = req.body.token;
    requestUber.requests.requestRide(rideRequest, function(err, result) {
      if (err) {
        console.error(err);
        res.satus(400).send({
          'error': 'ride request could not be completed',
          'uberError': err
        });
      } else {
        console.log(result);
        var result = result;
        if (result.status === 'processing') {
          var requestStatus = result.request_id;
          res.status(200).send("<script>window.close();</script>");
        } else if (result.message === 'Invalid Request' || result.code === 'validation_failed') {
          res.status(400).send({
            'error': 'wrong request',
            'uberError': result
          });
        }
      }
    });
  }

};
