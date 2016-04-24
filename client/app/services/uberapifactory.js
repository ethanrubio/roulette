angular.module('pubroulette.uberapi', [])
.factory('UberAPI', ['$http', '$window', function($http, $window) {

  $http.defaults.useXDomain = true;

  var uberData = {};
  var coordinates = {};
  var uberAuthenticate;

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

  var authenticate = function() {
    var uberX = uberData.data.prices[0].product_id;

    $window.open('http://localhost:3468/api/uber/authenticate?product_id=' + uberX
      + '&start_longitude=' + coordinates.start_longitude
      + '&start_latitude=' + coordinates.start_latitude
      + '&end_longitude=' + coordinates.end_longitude
      + '&end_latitude=' + coordinates.end_latitude, '_blank');
  };

  return {
    passLocation: passLocation,
    uberData: uberData,
    authenticate: authenticate
  };

}]);
