angular.module('pubroulette.uberapi', [])
.factory('UberAPI', ['$http', function($http) {

  var uberData = {};
  var uberAuthorize;

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

  var authorize = function() {
    return $http({
      method: 'GET',
      url: '/api/uber/authorize'
    })
    .then(function(resp) {
      uberAuthorize = resp;
      console.log(uberAuthorize);
    })
  }

  return {
    passLocation: passLocation,
    uberData: uberData
  };

}]);
