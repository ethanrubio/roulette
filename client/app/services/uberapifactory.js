angular.module('pubroulette.uberapi', [])

.factory("UberAPI", function ($http) {
  var passLocation = function(startLat, startLong, endLat, endLong){
    return $http({
      method: 'POST',
      url: '/api/uber/journey',
      data: {startLat: startLat, startLong: startLong, endLat: endLat, endLong: endLong}
    })
    .then(function(resp){
      console.log("uber API got a response! ", resp);
      return resp;
    });
  };

  return {
    passLocation: passLocation,
  };
});
