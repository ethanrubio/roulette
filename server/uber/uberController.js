var Uber = require('node-uber');
var keys = require('../util/config');
var User = require('../models/userModel');
var jwt = require('jwt-simple');

var secret = keys.jwt.secret;

var options = {
  sandbox: true,
  client_id: keys.uber.client_id,
  client_secret: keys.uber.client_secret,
  server_token: keys.uber.server_token,
  redirect_uri: keys.uber.redirect_uri,
  name: 'PUB_ROULETTE'
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
    }, function(err, result) {
     if (err) {
       console.error(err);
       res.status(400).send({
         'error': 'price estimate could not be completed',
         'uberError': err
       });
     } else {
       console.log(result);
       res.status(200).send(result);
     }
   });
  },

  authenticate: function(req, res) {
    var scope = ['profile', 'request', 'history'];
    res.redirect(uber.getAuthorizeUrl(scope, keys.uber.redirect_uri));
  },

  getToken: function(req, res) {
    var auth_code = req.body.code;
    uber.authorization({grantType: 'authorization_code', authorization_code: auth_code}, function(err, access_token) {
      module.exports.getProfile(access_token, res);
    });
  },
  
  getProfile: function(access_token, res) {
    if (!access_token || access_token === '') {
      res.status(401);
    } else {
      uber.user.profile(access_token, function(err, result) {
        if (err) {
          console.error(err);
          res.status(400);
        } else {
          if (result.uuid) {
            User.findOne({uuid: result.uuid}, function(err, user) {
              if (err) {
                var newUser = new User({
                  picture: result.picture,
                  first_name: result.first_name,
                  last_name: result.last_name,
                  uuid: result.uuid,
                  rider_id: result.rider_id,
                  email: result.email,
                  mobile_verified: result.mobile_verified,
                  promo_code: result.promo_code,
                  access_token: access_token
                });
                                
                newUser.save(function(err) {
                  if (err) {
                    console.error('user creation failed');
                    res.status(400).send({
                      'error': 'there was an error creating your user',
                      'mongooseError': err
                    });
                  }
                  var token = jwt.encode(newUser, secret);
                  res.status(200).send({token: token});
                });
              } else {
                user.update({
                  access_token: access_token
                }, function(err, raw) {
                  if (err) {
                    console.error(err);
                    res.status(400);
                  }
                  // update doesn't return model with updated info
                  user.access_token = access_token;
                  var token = jwt.encode(user, secret);
                  res.status(200).send({token: token});
                });
              }
            });            
          }
        }
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
   
    uber.access_token = req.body.access_token;
    uber.requests.requestRide(requestRide, function(err, result) {
      if (err) {
        console.error(err);
        res.status(400).send({
          'error': 'ride request could not be completed',
          'uberError': err
        });
      } else {
        var result = result;
        if (result.status === 'processing') {
          var requestStatus = result.request_id;
          res.status(200).send(result);
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
