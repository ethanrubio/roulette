angular.module('pubroulette.uberapi', [])
.factory('UberAPI', ['$http', 'jwtHelper', function($http, jwtHelper) {

  var uberData = {};
  var coordinates = {};
  var rideData = {};

  var passLocation = function(startLat, startLong, endLat, endLong) {
    coordinates.start_longitude = startLong;
    coordinates.start_latitude = startLat;
    coordinates.end_longitude = endLong;
    coordinates.end_latitude = endLat;

    return $http({
      method: 'POST',
      url: '/api/uber/journey',
      data: {startLat: startLat, startLong: startLong, endLat: endLat, endLong: endLong}
    })
    .then(function(resp) {
      uberData.data = resp.data;
      return resp;
    });
  };
  
  var requestRide = function() {
    var token = jwtHelper.decodeToken(localStorage['satellizer_token']);
    var uberX = uberData.data.prices[0].product_id;
    var dataToSend = {
      product_id: uberX,
      start_longitude: coordinates.start_longitude,
      start_latitude: coordinates.start_latitude,
      end_longitude: coordinates.end_longitude,
      end_latitude: coordinates.end_latitude,
      access_token: token.access_token
    };
        
    return $http({
      method: 'POST',
      url: '/api/uber/riderequest',
      data: dataToSend
    })
    .then(function(resp) {
      rideData = resp.data;
      console.log(resp);
      return resp;
    });
  };

  return {
    passLocation: passLocation,
    uberData: uberData,
    requestRide: requestRide
  };

}]);
