angular.module('pubroulette.uberapi', [])
.factory('UberAPI', ['$http', '$window', function($http, $window) {

  $http.defaults.useXDomain = true;

  var uberData = {};
  var uberAuthenticate;

  var passLocation = function(startLat, startLong, endLat, endLong) {
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

    $window.open('http://localhost:3000/api/uber/authenticate', '_blank');

  }

  return {
    passLocation: passLocation,
    uberData: uberData,
    authenticate: authenticate
  };

}]);
