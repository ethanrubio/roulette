angular.module('pubroulette.uberapi', [])
.factory('UberAPI', ['$http', function($http) {

  var uberData = {};

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

  return {
    passLocation: passLocation,
    uberData: uberData
  };
  
}]);
